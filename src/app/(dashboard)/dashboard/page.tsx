import { StatisticCard } from "@/components/statistic-card";
import { Icons } from "@/components/icons";
import Header from "@/components/header";
import StatisticItem from "@/components/activity-leaders";
import BarChar from "@/components/overview";
import DashboardShell from "@/components/shell";

import { getActivities, getStatistics } from "@/lib/analytics";
import { EmptyPlaceholder } from "@/components/empty-placeholder";

type CardData = {
  label: string;
  amount: number;
  icon: keyof typeof Icons
}

function generateStatisticFields(
  transport: CardData, 
  color: CardData, 
  category: CardData
): CardData[] {
  return [transport, color, category];
}

export default async function DashboardPage() {
  const activities = await getActivities();
  const { 
    categoryCount, colorCount, transportCount 
  } = await getStatistics();

  const transport: CardData = {
    label: "Всего транспорта",
    amount: transportCount,
    icon: "car"
  };

  const colors: CardData = {
    label: "Всего цветов",
    amount: colorCount,
    icon: "color",
  };

  const categories: CardData = {
    label: "Всего категорий",
    amount: categoryCount,
    icon: "category"
  };

  const generatedFields = generateStatisticFields(transport, colors, categories);

  return (
    <DashboardShell>
      <Header heading="Дашборд" text="Общая статистика сайта" />

      <div className="grid w-full grid-cols-1 gap-4 transition-all
        md:grid-cols-2 xl:grid-cols-3"
      >
        {generatedFields.map((data, i) => (
          <StatisticCard key={i}>
            <StatisticCard.Section
              className="flex flex-row items-center justify-between space-y-0"
            >
              <StatisticCard.Label>{data.label}</StatisticCard.Label>
              <StatisticCard.Icon name={data.icon} />
            </StatisticCard.Section>

            <StatisticCard.Section className="pt-0">
              <StatisticCard.Amount>{data.amount}</StatisticCard.Amount>
            </StatisticCard.Section>
          </StatisticCard>
        ))}
      </div>

      {!activities.totalCount ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="chart" />
          <EmptyPlaceholder.Title>Данных аналитики не найдено</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Скорее всего пользователи еще не успели ничего сделать
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          <StatisticCard className="col-start-1 col-end-13 sm:col-span-4">
            <StatisticCard.Section>
              <StatisticCard.Label className="font-semibold text-base">
                Обзор
              </StatisticCard.Label>
            </StatisticCard.Section>

            <StatisticCard.Section className="pt-0 pl-2">
              <BarChar />
            </StatisticCard.Section>
          </StatisticCard>

          <StatisticCard className="col-start-1 col-end-13 sm:col-span-3">
            <StatisticCard.Section className="flex flex-col space-y-1.5">
              <StatisticCard.Label className="font-semibold text-base">
                Лидеры активности
              </StatisticCard.Label>
              <StatisticCard.Description>
                Всего найдено пользователей: {activities.totalCount}
              </StatisticCard.Description>
            </StatisticCard.Section>

            <StatisticCard.Section className="pt-0 space-y-8">
              {activities.activities.map((activity, i) => (
                <StatisticItem 
                  key={i}
                  username={activity.username}
                  actions={activity._count}
                  createdAt={activity._max.createdAt} 
                />
              ))}
            </StatisticCard.Section>
          </StatisticCard>
        </div>
      )}
      
    </DashboardShell>
  )
}