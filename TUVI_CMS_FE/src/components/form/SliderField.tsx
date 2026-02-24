import type { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface SliderFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

const SliderField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> ({
  control,
  name,
  label,
  description,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className,
  required = false,
}: SliderFieldProps<TFieldValues, TName>)  => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
              <div className="text-sm font-semibold text-gray-600">
                {field.value ?? min}%
              </div>
            </FormLabel>
          )}
          <FormControl>
            <Slider
              min={min}
              max={max}
              step={step}
              value={[field.value ?? min]}
              onValueChange={(value) => field.onChange(value[0])}
              disabled={disabled}
              className={cn("flex-1", disabled && "opacity-50")}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
};

export default SliderField;
