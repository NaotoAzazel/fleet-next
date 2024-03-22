"use client"

import { useEffect, useState } from "react";
import { 
  ResponsiveContainer, 
  BarChart as BarGraph,
  XAxis,
  YAxis,
  Bar
} from "recharts";

import Loading from "@/components/loading";

const monthNames = [
  "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
];

export default function BarChar() {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStatistic = async() => {
      setIsLoading(true);

      const res = await fetch("/api/statistic");
      const data = await res.json();

      setData(
        monthNames.map((month, i) => {
          return {
            name: month,
            total: data[i]
          };
        }
      ));

      setIsLoading(false);
    }

    fetchStatistic();
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading className="w-full p-40" />
      ): (
        <ResponsiveContainer width="100%" height={350}>
          <BarGraph data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Bar
              dataKey="total"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarGraph>
        </ResponsiveContainer>
      )}
    </>
  )
}