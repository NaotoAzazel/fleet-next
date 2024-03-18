import { currentUser, verifyCurrentUserIsAdmin } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { postPatchSchema } from "@/lib/validation/post";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const user = await currentUser();
    const userMeatadata = user?.user.user_metadata;
    const isAdmin = verifyCurrentUserIsAdmin(userMeatadata.provider_id);

    if(!isAdmin) {
      return new NextResponse(null, { status: 403 });
    }

    await db.transport.delete({
      where: {
        id: Number(params.postId)
      }
    });
    
    const username = (userMeatadata.name).slice(0, userMeatadata.name.length - 2); // slice #0 after nick (naotoazazel#0)
    const providerId = userMeatadata.provider_id;

    await db.activity.create({
      data: {
        username,
        providerId
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

export async function PUT(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const json = await req.json();
    const body = postPatchSchema.parse(json);
  
    const user = await currentUser();
    const userMeatadata = user?.user.user_metadata;
    const isAdmin = verifyCurrentUserIsAdmin(userMeatadata.provider_id);
    if(!isAdmin) {
      return new NextResponse(null, { status: 403 });
    }
  
    await db.transport.update({
      where: {
        id: Number(params.postId)
      },
      data: {
        name: body.name, 
        colorId: body.colorId, 
        categoryId: body.categoryId, 
        plate: body.plate, 
        image: body.image
      }
    });

    const username = (userMeatadata.name).slice(0, userMeatadata.name.length - 2); // slice #0 after nick (naotoazazel#0)
    const providerId = userMeatadata.provider_id;

    await db.activity.create({
      data: {
        username,
        providerId
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