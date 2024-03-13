import { FilterItem, Transport } from "@/types";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/prisma";

type Sort = "asc" | "desc";
type Status = "avai" | "unavai" | "all";

type Metadata = {
  hasNextPage: boolean;
  totalPages: number;
  totalRecords: number;
};

interface Posts {
  data: Transport[];
  metadata: Metadata;
};

export async function getPostsByParams(
  name?: string, 
  sort: Sort = "asc",
  status: Status = "all",
  take: number = 8,
  skip: number = 0
): Promise<Posts> {
  const where: Prisma.TransportWhereInput = {};

  where.name = { startsWith: name, mode: "insensitive" };

  if(status !== "all") {
    where.takeBy = status === "avai"
      ? { equals: "" }
      : { not: { equals: "" } };
  };

  const results = await db.transport.findMany({
    take,
    skip,
    where,
    orderBy: { name: sort },
    include: { color: true, category: true }
  });

  const total = await db.transport.count();

  return {
    data: results,
    metadata: {
      hasNextPage: skip + take < total,
      totalPages: Math.ceil(total / take),
      totalRecords: total
    }
  };
}

export async function getColors(): Promise<FilterItem[]> {
  return await db.color.findMany();
}

export async function getCategories(): Promise<FilterItem[]> {
  return await db.category.findMany();
}

export async function fetchColors(): Promise<FilterItem[]> {
  const response = await fetch("/api/posts/colors");
  const data = await response.json();

  return data as FilterItem[];
}

export async function fetchCategories():Promise<FilterItem[]> {
  const response = await fetch("/api/posts/categories");
  const data = await response.json();
  return data as FilterItem[];
}