import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SortButton() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Сортировка"/>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="alphabet">Алфавит</SelectItem>
        <SelectItem value="unreachable">Недоступна</SelectItem>
      </SelectContent>
    </Select>
  )
}