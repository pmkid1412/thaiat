import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface SwitchFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  label?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  vertical?: boolean;
  required?: boolean;
}

export const SwitchField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  description,
  icon,
  disabled,
  className,
  vertical,
  required = false,
}: SwitchFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div
            className={cn("flex flex-row items-center justify-between", {
              "flex-col items-start gap-2": vertical,
            })}
          >
            <div className="space-y-0.5">
              {label && (
                <FormLabel
                  htmlFor={String(field.name)}
                  className="flex items-center gap-2"
                >
                  {icon}
                  {label}
                  {required && <span className="text-red-500 -ml-1">*</span>}
                </FormLabel>
              )}
              {description && (
                <div className="text-[0.8rem] text-muted-foreground">
                  {description}
                </div>
              )}
            </div>

            <FormControl>
              <Switch
                id={String(field.name)}
                checked={!!field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SwitchField;
