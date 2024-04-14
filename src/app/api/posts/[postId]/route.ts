import { authOptions, verifyCurrentUserIsAdmin } from "@/lib/auth";
import { getServerSession } from "next-auth";

import { db } from "@/lib/prisma";
import { postUpdateRoute } from "@/lib/validation/post";

import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

import { deleteFile } from "@uploadcare/rest-client";
import { uploadcareAuthSchema } from "@/lib/uploadcare";

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string().transform(value => parseInt(value, 10)),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const user = await getServerSession(authOptions);
    if(!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }
    
    const isAdmin = verifyCurrentUserIsAdmin(user.user.id);
    if(!isAdmin) {
      return new NextResponse(null, { status: 403 });
    }

    const imageId = await db.transport.findMany({
      where: {
        id:Number(params.postId)
      },
      select: { image: true }
    });
    
    await deleteFile(
      {
        uuid: imageId[0].image
      }, 
      {
        authSchema: uploadcareAuthSchema
      }
    );

    await db.transport.delete({
      where: {
        id: Number(params.postId)
      }
    });

    await db.activity.create({
      data: {
        username: user.user.name,
        providerId: user.user.id
      },
      select: { id: true }
    });

    return new NextResponse(null, { status: 200 });
  } catch(error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    return new NextResponse(null, { status: 500 })
  }
}

const routeParams = z.object({
  source: z
    .enum(["reserve:take", "reserve:return", "edit"])
    .catch("edit")
});

export async function PUT(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const { source } = routeParams.parse({
      source: req.nextUrl.searchParams.get("source")
    });

    const user = await getServerSession(authOptions);
    if(!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }

    const json = await req.json();
    const body = postUpdateRoute.parse(json);

    const transport = await db.transport.findFirst({
      where: {
        id: params.postId
      }
    });

    if(!transport) {
      throw new Error("Не удалось найти транспорт");
    }

    switch(source) {
      case "reserve:take": {
        if(transport.takeBy === user.user.id) {
          throw new Error("Вы уже выбрали этот транспорт");
        }

        if(transport.takeBy.length) {
          throw new Error("Этот траспорт уже зарезервирован");
        }

        await updateTakeBy(params.postId, body.takeBy);
        break;
      }

      case "reserve:return": {
        if(transport.takeBy !== user.user.id) {
          throw new Error("Вы не владеете этим транспортом");
        }

        await updateTakeBy(params.postId, "");
        break;
      }

      case "edit": {
        const isAdmin = verifyCurrentUserIsAdmin(user.user.id);
        if(!isAdmin) {
          return NextResponse.json({ message: "Not authorized" }, { status: 403 });
        }

        const imageId = await db.transport.findFirst({
          where: {
            id: params.postId
          },
          select: { image: true }
        });

        // Deleting image from uploadcare
        await deleteFile({
          uuid: imageId?.image as string
        }, {
          authSchema: uploadcareAuthSchema
        });

        await db.transport.update({
          where: {
            id: params.postId
          },
          data: {
            name: body.name, 
            colorId: body.colorId, 
            categoryId: body.categoryId, 
            plate: body.plate, 
            takeBy: body.takeBy,
            image: body.image
          }
        });

        break;
      }
    }

    await db.activity.create({
      data: {
        username: user.user.name,
        providerId: user.user.id
      },
      select: { id: true }
    });

    return new NextResponse(null, { status: 200 });
  } catch(error) {
    if(error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    if(error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return new NextResponse(null, { status: 500 });
  }
}

async function updateTakeBy(postId: number, takeBy: string): Promise<void> {
  await db.transport.update({
    where: {
      id: postId
    },
    data: { takeBy }
  });
}