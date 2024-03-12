"use client"

import Header from "@/components/header";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function DashboardPage() {
  return (
    <MaxWidthWrapper>
      <Header heading="Дашборд" text="Общая статистика сайта" />
    </MaxWidthWrapper>
  )
}