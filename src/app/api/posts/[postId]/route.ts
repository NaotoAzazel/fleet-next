import { authOptions, verifyCurrentUserIsAdmin } from "@/lib/auth";
import { getServerSession } from "next-auth";

import { db } from "@/lib/prisma";
import { postUpdateRoute } from "@/lib/validation/post";

import { NextResponse } from "next/server";
import * as z from "zod";

import { deleteFile } from "@uploadcare/rest-client";
import { uploadcareAuthSchema } from "@/lib/uploadcare";

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

export async function PUT(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const json = await req.json();
    const body = postUpdateRoute.parse(json);
  
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