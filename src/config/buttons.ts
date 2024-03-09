export type Button = {
  name: string;
  value: string;
}

export const sortParams: Button[] = [
  { name: "Алфавит: А-Я", value: "asc" },
  { name: "Алфавит: Я-А", value: "desc" }
];

export const statusParams: Button[] = [
  { name: "Доступна", value: "avai" },
  { name: "Недоступна", value: "unavai" }
];