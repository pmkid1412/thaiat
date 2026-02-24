import { X } from "lucide-react";
import { useState, useMemo, useRef } from "react";
import { Controller } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface Option {
  label: string;
  value: number;
}

import type { Control, FieldValues, Path } from "react-hook-form";

interface TagMultiSelectFieldProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>; // should point to number[] field
  label?: string;
  required?: boolean;
  options?: Option[];
  placeholder?: string;
  description?: string;
  disabled?: boolean;
}

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const splitTokens = (raw: string) =>
  raw
    .split(/[\n,]/)
    .map((t) => t.trim())
    .filter(Boolean);

export const TagMultiSelectField = <T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  required,
  options = [],
  placeholder,
  description,
  disabled,
}: TagMultiSelectFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          {label && (
            <label className="text-sm font-medium">
              {label} {required && <span className="text-destructive">*</span>}
            </label>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          <TagIdsEditor
            ids={Array.isArray(field.value) ? field.value : []}
            onChange={field.onChange}
            options={options}
            placeholder={placeholder}
            disabled={disabled}
          />
          {fieldState.error && (
            <p className="text-sm text-destructive">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

interface TagIdsEditorProps {
  ids: number[];
  onChange: (ids: number[]) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
}

const TagIdsEditor = ({
  ids,
  onChange,
  options,
  placeholder,
  disabled,
}: TagIdsEditorProps) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const labelMap = useMemo(() => {
    const m = new Map<string, number>();
    options.forEach((o) => m.set(normalize(o.label), o.value));
    return m;
  }, [options]);

  const displayMap = useMemo(() => {
    const m = new Map<number, string>();
    options.forEach((o) => m.set(o.value, o.label));
    return m;
  }, [options]);

  const filteredOptions = useMemo(() => {
    const needle = normalize(inputValue);
    return options
      .filter((o) => !ids.includes(o.value))
      .filter((o) => (needle ? normalize(o.label).includes(needle) : true))
      .slice(0, 15);
  }, [options, ids, inputValue]);

  const addIds = (newIds: number[]) => {
    if (!newIds.length) return;
    const unique = newIds.filter((id) => !ids.includes(id));
    if (unique.length) onChange([...ids, ...unique]);
  };

  const parseInputTokens = () => {
    if (!inputValue.trim()) return;
    const tokens = splitTokens(inputValue);
    const result: number[] = [];
    tokens.forEach((tok) => {
      if (/^\d+$/.test(tok)) {
        result.push(Number(tok));
      } else {
        const mapped = labelMap.get(normalize(tok));
        if (mapped !== undefined) result.push(mapped);
      }
    });
    if (result.length) addIds(result);
    setInputValue("");
  };

  const removeId = (id: number) => {
    onChange(ids.filter((x) => x !== id));
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      parseInputTokens();
    } else if (e.key === "Backspace" && !inputValue && ids.length) {
      // Remove last quickly
      removeId(ids[ids.length - 1]);
    }
  };

  const handleSelectOption = (opt: Option) => {
    addIds([opt.value]);
    setInputValue("");
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    parseInputTokens();
  };

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <div
          className="flex flex-wrap items-center gap-2 rounded-md border focus-within:ring-2 focus-within:ring-ring bg-background relative"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="absolute top-0 left-0 flex gap-1 items-center h-full px-1">
            {ids.map((id) => (
              <Badge
                key={id}
                variant="default"
                className="flex items-center gap-1 py-1 pl-2 pr-1"
              >
                <span className="text-xs font-medium">
                  {displayMap.get(id) || id}
                </span>
                <button
                  type="button"
                  onClick={() => removeId(id)}
                  className="rounded-sm p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <PopoverTrigger asChild>
            <Input
              ref={inputRef}
              value={inputValue}
              disabled={disabled}
              placeholder={ids.length ? undefined : placeholder}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className="flex-1 h-9 border-0 shadow-none focus-visible:ring-0 focus-visible:outline-none px-1"
            />
          </PopoverTrigger>
        </div>
        <PopoverContent className="p-0 w-64" align="start">
          <div className="flex flex-col">
            {filteredOptions.length === 0 && (
              <div className="p-3 text-muted-foreground">
                Không có gợi ý
              </div>
            )}
            {filteredOptions.map((opt) => (
              <Button
                key={opt.value}
                variant="ghost"
                type="button"
                className="justify-start h-8 px-4 py-2 text-sm"
                onClick={() => handleSelectOption(opt)}
              >
                {opt.label}
              </Button>
            ))}
            {filteredOptions.length > 0 && <Separator />}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
