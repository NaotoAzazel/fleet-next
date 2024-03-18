import { db } from "@/lib/prisma";

type Activity = {
  _max: {
    username: string | null;
    createdAt: Date | null;
  };
  _count: number;
  providerId: string;
};

interface Activities {
  totalCount: number;
  activities: Activity[];
};

export async function getActivities(): Promise<Activities> {
  const activities = await db.activity.groupBy({
    by: "providerId",
    _count: true,
    orderBy: {
      _count: {
        username: "desc",
      },
    },
    _max: {
      username: true,
      createdAt: true
    },
    skip: 0,
    take: 5
  });

  const totalCount = await db.activity.groupBy({
    by: "providerId"
  }).then((res) => res.length);

  return { totalCount, activities };
}

type Statistics = {
  transportCount: number;
  colorCount: number;
  categoryCount: number;
};

export async function getStatistics(): Promise<Statistics> {
  const transportCount = await db.transport.count();
  const colorCount = await db.color.count();
  const categoryCount = await db.category.count();
  return { transportCount, colorCount, categoryCount } 
}