import { authOptions, verifyCurrentUserIsAdmin } from "@/lib/auth";
import { db } from "@/lib/prisma";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const user = await getServerSession(authOptions);
    if(!user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }

    const isAdmin = verifyCurrentUserIsAdmin(user.user.id);
    if(!isAdmin) {
      return new NextResponse(null, { status: 403 });
    }

    const currentYear = new Date().getFullYear();
    const activities = await db.activity.findMany({
      where: {
        createdAt: {
          gte: new Date(`${currentYear}-01-01T00:00:00Z`),
          lt: new Date(`${currentYear + 1}-01-01T00:00:00Z`),
        }
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const monthNames = [
      "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
    ];

    const activitiesByMonth = monthNames.map(month => {
      return {
        name: month,
        total: 0
      }
    });

    activities.forEach((activity) => {
      const createdAt = new Date(activity.createdAt);
      const month = createdAt.getMonth();

      const monthValue: number = activitiesByMonth[month].total;
      activitiesByMonth[month].total = monthValue + 1;
    });

    return new NextResponse(JSON.stringify(activitiesByMonth), { status: 200 });
  } catch(error) {
    return new NextResponse(null, { status: 500 });
  }
}