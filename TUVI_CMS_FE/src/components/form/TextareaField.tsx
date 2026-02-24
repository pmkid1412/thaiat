import type { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface TextareaFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  required?: boolean;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

export const TextareaField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  required,
  control,
  label,
  placeholder,
  rows = 3,
  disabled,
  className,
}: TextareaFieldProps<TFieldValues, TName>) => {
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
          <FormControl>
            <Textarea
              {...field}
              disabled={disabled}
              placeholder={placeholder}
              rows={rows}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextareaField;
