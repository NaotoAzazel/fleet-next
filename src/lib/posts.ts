import { FilterItem, FilterType, Transport } from "@/types";
import { db } from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type Sort = "asc" | "desc";
type Status = "avai" | "unavai" | "mytake" |"all";

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
};

export async function getPostsByParams({
  name = undefined,
  sort = "asc",
  status = "all",
  take = 8,
  skip = 0
}: GetPostByParams): Promise<Posts> {
  const user = await getServerSession(authOptions);

  const obj: Record<Status, any> = {
    avai: { equals: "" }, 
    unavai: { not: { equals: "", in: [user?.user.id] } },
    mytake: { equals: user?.user.id },
    all: undefined
  };

  const results = await db.transport.findMany({
    take,
    skip,
    where: {
      name: {
        startsWith: name,
        mode: "insensitive"
      },
      takeBy: obj[status]
    },
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
  try {
    const response = await fetch(`/api/${filterType}`);

    if(!response?.ok) {
      return [];
    }

    const data = await response.json();
    return data as FilterItem[];
  } catch(error) {
    return [];
  }
}