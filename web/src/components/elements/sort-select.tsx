import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type SortList = {
  label: string;
  sortBy: string;
  order: "asc" | "desc";
};

type SortSelectProps = {
  sortList: SortList[];
};

export const SortSelect = ({ sortList }: SortSelectProps) => {
  const [_, setParams] = useSearchParams();

  const handleSortChange = (selectedValue: string) => {
    const selectedItem = sortList.find((item) => `${item.sortBy}:${item.order}` === selectedValue);

    if (selectedItem) {
      setParams({ sortBy: selectedItem.sortBy, order: selectedItem.order });
    }
  };

  return (
    <Select onValueChange={handleSortChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Urutkan" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortList.map((item) => (
            <SelectItem key={item.label} value={`${item.sortBy}:${item.order}`}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
