import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SortButtonProps = {
  name: string;
  value: string;
} 

export default function SortButton({ 
  buttons, 
  placeholder,
  value,
  onValueChange
}: { 
  buttons: SortButtonProps[], 
  placeholder: string,
  value: string,
  onValueChange: (value: string) => void
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="lg:w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {buttons.map(button => (
          <SelectItem
            key={button.value} 
            value={button.value}
          >
            {button.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}