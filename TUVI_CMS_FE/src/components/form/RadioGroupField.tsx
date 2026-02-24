import type { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Option {
  label: string;
  value: string;
}

interface RadioGroupFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  required?: boolean;
  control: Control<TFieldValues>;
  label: string;
  options: Option[];
  className?: string;
}

export const RadioGroupField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  required,
  control,
  label,
  options,
  className,
}: RadioGroupFieldProps<TFieldValues, TName>) => {
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
            <RadioGroup
              className="flex flex-row items-center gap-5 flex-wrap"
              onValueChange={field.onChange}
              value={field.value}
            >
              {options.map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <RadioGroupItem value={opt.value} id={opt.value} />
                  <Label htmlFor={opt.value} className="font-normal">
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RadioGroupField;
