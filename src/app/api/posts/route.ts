import { currentUser, verifyCurrentUserIsAdmin } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { postCreateSchema } from "@/lib/validation/post";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  const json = await req.json();
  const body = postCreateSchema.parse(json);
  console.log(body);

  const user = await currentUser();
  const isAdmin = verifyCurrentUserIsAdmin(user?.user?.user_metadata.provider_id);
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
  })

  return new NextResponse(null, { status: 200 });
}