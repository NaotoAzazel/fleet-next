import { currentUser, verifyCurrentUserIsAdmin } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { postCreateSchema } from "@/lib/validation/post";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const json = await req.json();
    const body = postCreateSchema.parse(json);
  
    const user = await currentUser();
    const userMeatadata = user?.user.user_metadata;
    const isAdmin = verifyCurrentUserIsAdmin(userMeatadata.provider_id);
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
    return new NextResponse(null, { status: 500 });
  }
}