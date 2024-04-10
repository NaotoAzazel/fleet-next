import { authOptions, verifyCurrentUserIsAdmin } from "@/lib/auth";
import { filterCreateSchema } from "@/lib/validation/filter";

import { db } from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import * as z from "zod";

export async function GET() {
  try {
    const colors = await db.color.findMany();
    return new NextResponse(JSON.stringify(colors), { status: 200 });
  } catch(error) {
    return new NextResponse(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = filterCreateSchema.parse(json);

    const user = await getServerSession(authOptions);
    if(!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }

    const isAdmin = verifyCurrentUserIsAdmin(user.user.id);
    if(!isAdmin) {
      return new NextResponse(null, { status: 403 });
    }

    await db.color.create({
      data: {
        name: body.name
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
    if(error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse(null, { status: 500 });
  }
}