import { authOptions, verifyCurrentUserIsAdmin } from "@/lib/auth";
import { getServerSession } from "next-auth";

import { db } from "@/lib/prisma";
import { postCreateSchema } from "@/lib/validation/post";

import { NextResponse } from "next/server";
import * as z from "zod";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = postCreateSchema.parse(json);
  
    const user = await getServerSession(authOptions);
    if(!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }

    const isAdmin = verifyCurrentUserIsAdmin(user.user.id);
    if(!isAdmin) {
      return new NextResponse(null, { status: 403 });
    }
  
    await db.transport.create({
      data: {
        name: body.name,
        colorId: body.colorId,
        categoryId: body.categoryId,
        plate: body.plate,
        image: body.image,
        takeBy: ""
      },
      select: { id: true }
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