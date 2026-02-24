import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  required?: boolean;
  control: Control<TFieldValues>;
  label: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const DateField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  required,
  control,
  label,
  description,
  className,
  disabled,
  placeholder = "dd/MM/yyyy",
}: DateFieldProps<TFieldValues, TName>) => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(new Date());

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Parse the date value - handle string dates in dd/MM/yyyy, yyyy-MM-dd format or ISO format
        let selectedDate: Date | undefined = undefined;

        if (field.value) {
          if (typeof field.value === 'string') {
            // Try parsing dd/MM/yyyy format first
            if (field.value.includes('/') && field.value.split('/').length === 3) {
              const [day, month, year] = field.value.split('/');
              selectedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            }
            // Try parsing yyyy-MM-dd format
            else if (field.value.includes('-') && field.value.split('-').length === 3) {
              const [year, month, day] = field.value.split('-');
              selectedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            }
            // Fallback to ISO format or other date strings
            else {
              selectedDate = new Date(field.value);
            }
          } else {
            selectedDate = field.value as Date;
          }

          // Validate the parsed date
          if (selectedDate && isNaN(selectedDate.getTime())) {
            selectedDate = undefined;
          }
        }

        return (
          <FormItem className={className}>
            <FormLabel>
              {label}
              {required && <span className="text-destructive -ml-1">*</span>}
            </FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={`w-full pl-3 text-left font-normal ${
                      !field.value && "text-muted-foreground"
                    }`}
                    disabled={disabled}
                  >
                    {field.value ? (
                      format(selectedDate!, "dd/MM/yyyy", { locale: vi })
                    ) : (
                      <span>{placeholder}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 flex flex-col items-center" align="start">
                <div className="flex items-center justify-between gap-0.5 p-3 border-b">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => {
                      setMonth(new Date(month.getFullYear(), month.getMonth() - 1));
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex gap-2">
                    <Select
                      value={month.getMonth().toString()}
                      onValueChange={(value) => {
                        setMonth(new Date(month.getFullYear(), parseInt(value)));
                      }}
                    >
                      <SelectTrigger className="w-[110px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {format(new Date(2024, i), "MMMM", { locale: vi })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={month.getFullYear().toString()}
                      onValueChange={(value) => {
                        setMonth(new Date(parseInt(value), month.getMonth()));
                      }}
                    >
                      <SelectTrigger className="w-[90px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 100 }, (_, i) => {
                          const year = new Date().getFullYear() - 50 + i;
                          return (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => {
                      setMonth(new Date(month.getFullYear(), month.getMonth() + 1));
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                    setOpen(false);
                  }}
                  disabled={disabled}
                  month={month}
                  onMonthChange={setMonth}
                  locale={vi}
                  className="w-full"
                />
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
