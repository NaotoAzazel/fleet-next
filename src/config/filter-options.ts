export type Sort = {
  value: string;
  label: string;
}

export const sortParams: Sort[] = [
  { label: "Алфавит: А-Я", value: "asc" },
  { label: "Алфавит: Я-А", value: "desc" } 
]

export const statusParams: Sort[] = [
  { label: "Доступна", value: "avai" },
  { label: "Недоступна", value: "unavai" },
  { label: "Выбрано вами", value: "mytake" }
];