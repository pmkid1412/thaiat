import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { type FC, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
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
import { commonKeys } from "@/services/queries/common.query";
import type { PredictionSearchParams } from "@/services/types/prediction.type";
import { PREDICTION_TYPES, ROUTES } from "@/shared/constants";
import { useDebounce } from "@/shared/utils/debounce";
import type { PredictionType } from "@/shared/types/prediction";

interface PredictionSearchFilterProps {
  onChange?: (
    params: (prev: PredictionSearchParams) => PredictionSearchParams
  ) => void;
}

export const PredictionSearchFilter: FC<PredictionSearchFilterProps> = ({
  onChange,
}) => {
  const navigate = useNavigate();
  const getLanguagesQuery = useQuery(commonKeys.getLanguages());
  const defaultLanguageId = getLanguagesQuery.data?.[0]?.value;

  useEffect(() => {
    setSelectedLanguage(getLanguagesQuery.data?.[0]?.value);
  }, [getLanguagesQuery.data]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguageId);
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [selectedType, setSelectedType] = useState<PredictionType>();

  const getPredictionStatusesQuery = useQuery(
    commonKeys.getPredictionStatuses(defaultLanguageId)
  );

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const openAddPredictionPage = () => {
    navigate({ to: ROUTES.PREDICTIONS_NEW });
  };

  useEffect(() => {
    onChange?.((prev) => ({
      ...prev,
      search: debouncedSearchQuery || undefined,
    }));
  }, [debouncedSearchQuery, onChange]);

  const handleLanguageChange = (value: string) => {
    const langId = Number(value);
    setSelectedLanguage(langId);
    onChange?.((prev) => ({ ...prev, languageId: langId }));
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    const statusId = value === "all" ? undefined : Number(value);
    onChange?.((prev) => ({ ...prev, statusId }));
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value as PredictionType);
    const type = value === "all" ? undefined : (value as PredictionType);
    onChange?.((prev) => ({ ...prev, type }));
  };

  return (
    <div className="flex justify-between flex-1 gap-4">
      <div className="flex gap-3">
        <InputGroup className="w-80">
          <InputGroupInput
            placeholder="Tìm kiếm dự đoán..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <Select
          value={String(selectedLanguage)}
          onValueChange={handleLanguageChange}
        >
          <SelectTrigger className="w-32 bg-white">
            <SelectValue placeholder="Ngôn ngữ" />
          </SelectTrigger>
          <SelectContent>
            {getLanguagesQuery.data?.map((lang) => (
              <SelectItem key={lang.value} value={String(lang.value)}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-24 bg-white">
            <SelectValue placeholder="Loại" />
          </SelectTrigger>
          <SelectContent align="start" className="w-fit">
            <SelectItem value="all">Tất cả</SelectItem>
            {Object.values(PREDICTION_TYPES).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-36 bg-white">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {getPredictionStatusesQuery.data?.map((status) => (
              <SelectItem key={status.value} value={String(status.value)}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={openAddPredictionPage}>
        <Plus /> Thêm dự đoán
      </Button>
    </div>
  );
};
