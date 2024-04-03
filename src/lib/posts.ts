import { FilterItem, FilterType, Transport } from "@/types";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/prisma";

type Sort = "asc" | "desc";
type Status = "avai" | "unavai" | "all";

type Metadata = {
  totalPages: number;
  totalRecords: number;
};

interface Posts {
  data: Transport[];
  metadata: Metadata;
};

interface GetPostByParams {
  name?: string;
  sort?: Sort;
  status?: Status;
  take?: number;
  skip?: number;
}

export async function getPostsByParams({
  name = undefined,
  sort = "asc",
  status = "all",
  take = 8,
  skip = 0
}: GetPostByParams): Promise<Posts> {
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
      totalPages: Math.ceil(total / take),
      totalRecords: total
    }
  };
}

interface Colors {
  data: FilterItem[];
  metadata: Metadata;
};

export async function getColorsByParams(
  take: number = 8,
  skip: number = 0
): Promise<Colors> {
  const results = await db.color.findMany({
    take,
    skip,
    orderBy: { name: "asc" },
  });

  const total = await db.color.count();

  return {
    data: results,
    metadata: {
      totalPages: Math.ceil(total / take),
      totalRecords: total
    }
  };
}

interface Categories 
  extends Colors {};

export async function getCategoriesByParams(
  take: number = 8,
  skip: number = 0
): Promise<Categories> {
  const results = await db.category.findMany({
    take,
    skip,
    orderBy: { name: "asc" },
  });

  const total = await db.category.count();

  return {
    data: results,
    metadata: {
      totalPages: Math.ceil(total / take),
      totalRecords: total
    }
  };
}

export async function fetchData(
  filterType: FilterType
): Promise<FilterItem[]> {
  const response = await fetch(`/api/posts/${filterType}`);
  const data = await response.json();
  return data as FilterItem[];
}