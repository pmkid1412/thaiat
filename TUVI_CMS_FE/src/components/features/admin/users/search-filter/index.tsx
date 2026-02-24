import { Search } from "lucide-react";
import {
  useEffect,
  useState,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserSearchParams } from "@/services/types";
import { useDebounce } from "@/shared/utils/debounce";
import { filterItems } from "./constants";
import { USER_STATUS_OPTIONS } from "@/shared/constants";

interface UsersSearchFilterProps {
  onChange: Dispatch<SetStateAction<UserSearchParams>>;
}

export const UsersSearchFilter: FC<UsersSearchFilterProps> = ({ onChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string>();

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    onChange((prev) => ({
      ...prev,
      search: debouncedSearchQuery || undefined,
    }));
  }, [debouncedSearchQuery, onChange]);

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    const type = value === "all" ? undefined : Number(value);

    onChange((prev) => ({ ...prev, type }));
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    const status = value === "all" ? undefined : value;

    onChange((prev) => ({ ...prev, status }));
  };

  return (
    <div className="flex flex-1 gap-4">
      <InputGroup className="w-96">
        <InputGroupInput
          placeholder="Tìm kiếm người dùng..."
          aria-label="Tìm kiếm người dùng"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      <Select value={selectedStatus} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-40 bg-white">
          <SelectValue placeholder="Trạng thái" />
        </SelectTrigger>
        <SelectContent>
          {USER_STATUS_OPTIONS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedFilter} onValueChange={handleFilterChange}>
        <SelectTrigger className="w-32 bg-white">
          <SelectValue placeholder="Gói đăng ký" />
        </SelectTrigger>
        <SelectContent>
          {filterItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
