import { Header } from "@/components/header";
import DashboardShell from "./_components/shell";

import { Skeleton } from "@/components/ui/skeleton";
import { StatisticCard } from "@/components/cards/statistic-card";
import Loading from "@/components/loading";

import { Icons } from "@/components/icons";
import { StatisticItem } from "./_components/activity-leaders";

type CardData = {
  label: string;
  icon: keyof typeof Icons;
};

export default function DashboardPageLoading() {
  const cardLabels: CardData[] = [
    {
      label: "Всего транспорта",
      icon: "car"
    },
    {
      label: "Всего цветов",
      icon: "color",
    },
    {
      label: "Всего категорий",
      icon: "category"
    }
  ];

  return (
    <DashboardShell>
      <Header heading="Дашборд" text="Общая статистика сайта" />

      <div className="grid w-full grid-cols-1 gap-4 transition-all
        md:grid-cols-2 xl:grid-cols-3"
      >
        {cardLabels.map((data, i) => (
          <StatisticCard key={i}>
            <StatisticCard.Section
              className="flex flex-row items-center justify-between space-y-0"
            >
              <StatisticCard.Label>{data.label}</StatisticCard.Label>
              <StatisticCard.Icon name={data.icon} />
            </StatisticCard.Section>

            <StatisticCard.Section className="pt-0">
              <Skeleton className="h-8 w-6" />
            </StatisticCard.Section>
          </StatisticCard>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
        <StatisticCard className="col-start-1 col-end-13 sm:col-span-4">
          <StatisticCard.Section>
            <StatisticCard.Label className="font-semibold text-base">
              Обзор
            </StatisticCard.Label>
          </StatisticCard.Section>

          <StatisticCard.Section className="pt-0 pl-2">
            <Loading className="w-full p-40" />
          </StatisticCard.Section>
        </StatisticCard>

        <StatisticCard className="col-start-1 col-end-13 sm:col-span-3">
          <StatisticCard.Section className="flex flex-col space-y-1.5">
            <StatisticCard.Label className="font-semibold text-base">
              Лидеры активности
            </StatisticCard.Label>
            <StatisticCard.Description>
              <Skeleton className="h-4 w-56" />
            </StatisticCard.Description>
          </StatisticCard.Section>

          <StatisticCard.Section className="pt-0 space-y-8">
            <StatisticItem.Skeleton />
            <StatisticItem.Skeleton />
            <StatisticItem.Skeleton />
            <StatisticItem.Skeleton />
            <StatisticItem.Skeleton />
          </StatisticCard.Section>
        </StatisticCard>
      </div>
    </DashboardShell>
  )
}