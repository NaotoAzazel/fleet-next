import { db } from "@/lib/prisma";

type Activity = {
  _max: {
    createdAt: Date | null;
  };
  _count: number;
  username: string;
};

interface Activities {
  totalCount: number;
  activities: Activity[];
};

export async function getActivities(): Promise<Activities> {
  const activities = await db.activity.groupBy({
    by: ["username"],
    _count: true,
    orderBy: {
      _count: {
        username: "desc",
      },
    },
    _max: {
      createdAt: true
    },
    skip: 0,
    take: 5
  });

  const totalCount = await db.activity.count();

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