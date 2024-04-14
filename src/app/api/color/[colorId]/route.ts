import { authOptions, verifyCurrentUserIsAdmin } from "@/lib/auth";
import { filterUpdateSchema } from "@/lib/validation/filter";

import { db } from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    colorId: z.string(),
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

    await db.color.delete({
      where: {
        id: Number(params.colorId)
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
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse(null, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const json = await req.json();
    const body = filterUpdateSchema.parse(json);

    const user = await getServerSession(authOptions);
    if(!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }
    
    const isAdmin = verifyCurrentUserIsAdmin(user.user.id);
    if(!isAdmin) {
      return new NextResponse(null, { status: 403 });
    }
  
    await db.color.update({
      where: {
        id: Number(params.colorId)
      },
      data: { name: body.name }
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
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse(null, { status: 500 });
  }
}