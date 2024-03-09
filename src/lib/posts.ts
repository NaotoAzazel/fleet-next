import { Transport } from "@/types";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/prisma";

export async function getPostsByParams(
  name?: string, 
  sort: "asc" | "desc" = "asc",
  status: "avai" | "unavai" | "all" = "all"
): Promise<Transport[]> {
  const where: Prisma.TransportWhereInput = {};

  where.name = { startsWith: name, mode: "insensitive" };

  if(status !== "all") {
    where.takeBy = status === "avai"
      ? { equals: "" }
      : { not: { equals: "" } };
  };

  return await db.transport.findMany({
    where,
    orderBy: { name: sort }
  });
}