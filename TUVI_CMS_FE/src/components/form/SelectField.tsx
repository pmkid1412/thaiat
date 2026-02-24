import type { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  required?: boolean;
  control: Control<TFieldValues>;
  label: string;
  options: SelectOption[];
  description?: string;
  placeholder?: string;
  className?: string;
}

export const SelectField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  required,
  control,
  label,
  options,
  description,
  placeholder,
  className,
}: SelectFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-destructive -ml-1">*</span>}
          </FormLabel>
          <Select onValueChange={field.onChange} {...field}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value.toString()}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
