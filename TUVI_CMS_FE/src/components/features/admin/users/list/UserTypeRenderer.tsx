import { useEffect, useState, type FC } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { UpgradeUserByTypeRequest } from "@/services/types";
import { USER_TYPE_TAGS } from "./constant";

interface UserTypeRendererProps {
  type: number;
  userId: number;
  disabled?: boolean;
  onChange?: (data: UpgradeUserByTypeRequest) => Promise<void>;
  onOpenUserUpgrade?: (id: number) => void;
}

export const UserTypeRenderer: FC<UserTypeRendererProps> = ({
  type,
  userId,
  disabled,
  onChange,
  onOpenUserUpgrade,
}) => {
  const [selectedUserType, setSelectedUserType] = useState(
    USER_TYPE_TAGS.find((u) => u.value === type)
  );

  // Keep local selectedUserType in sync when parent prop `type` changes
  useEffect(() => {
    setSelectedUserType(USER_TYPE_TAGS.find((u) => u.value === type));
  }, [type]);

  const handleSelectChange = (value: string) => {
    const foundUserType = USER_TYPE_TAGS.find(
      (userType) => userType.value.toString() === value
    );
    if (onChange && foundUserType && value === "0") {
      onChange({ id: userId, data: { userType: foundUserType.value } });
      setSelectedUserType(foundUserType);
    } else if (value === "1" && onOpenUserUpgrade) {
      onOpenUserUpgrade(userId);
    }
  };

  return (
    <Select
      value={selectedUserType?.value?.toString()}
      onValueChange={handleSelectChange}
      disabled={disabled}
    >
      <SelectTrigger className={cn("w-20")}>
        <SelectValue>
          <div
            className={cn("flex items-center gap-0.5", {
              "text-gray-600": selectedUserType?.value === 0,
              "text-purple-600": selectedUserType?.value === 1,
            })}
          >
            <span className="font-medium">{selectedUserType?.label}</span>
          </div>
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {USER_TYPE_TAGS.map((option) => (
          <SelectItem key={option.value} value={option.value.toString()}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
