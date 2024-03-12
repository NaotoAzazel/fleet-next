import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select";
import { FilterItem } from "@/types";

export default function SelectFilter({
  placeholder,
  items,
  value,
  onValueChange
}: {
  placeholder: string,
  items: FilterItem[],
  value?: string
  onValueChange?: React.Dispatch<React.SetStateAction<string>>,
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {!items.length && (
            <SelectItem
              value="not-found"
              disabled
            >
              Данные не найдено...
            </SelectItem>
          )}
          {items.map(item => (
            <SelectItem
              key={item.id}
              value={String(item.id)}
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}