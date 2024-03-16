import { currentUser, verifyCurrentUserIsAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await currentUser();
    const isAdmin = verifyCurrentUserIsAdmin(user?.user?.user_metadata.provider_id);

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
    
    const formattedActivities = Array(12).fill(0);
    const activitiesByMonth: any = {};
    
    activities.forEach(activity => {
      const createdAt = new Date(activity.createdAt);
      const month = `${createdAt.getMonth() + 1}`;
      activitiesByMonth[month] = (activitiesByMonth[month] || 0) + 1;
    });
    
    for(let i = 1; i <= 12; i++) {
      formattedActivities[i - 1] = activitiesByMonth[i] || 0;
    }

    return new NextResponse(JSON.stringify(formattedActivities), { status: 200 });
  } catch(error) {
    return new NextResponse(null, { status: 500 });
  }
}