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
    const isAdmin = verifyCurrentUserIsAdmin(user?.user?.user_metadata.provider_id);

    if(!isAdmin) {
      return new NextResponse(null, { status: 403 });
    }

    await db.transport.delete({
      where: {
        id: Number(params.postId)
      }
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
  const { params } = routeContextSchema.parse(context);
  const json = await req.json();
  const body = postPatchSchema.parse(json);

  const user = await currentUser();
  const isAdmin = verifyCurrentUserIsAdmin(user?.user?.user_metadata.provider_id);
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

  return new NextResponse(null, { status: 200 });
}