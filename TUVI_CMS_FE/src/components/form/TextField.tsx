import type { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";

interface TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  required?: boolean;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}

export const TextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  required,
  control,
  label,
  placeholder,
  type = "text",
  disabled,
  className,
}: TextFieldProps<TFieldValues, TName>) => {
  const [showPassword, setShowPassword] = useState(false);

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
          <div className="relative">
            <FormControl>
              <Input
                {...field}
                disabled={disabled}
                type={
                  type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                placeholder={placeholder}
              />
            </FormControl>
            {type === "password" && (
              <Button
                className="absolute inset-y-0 right-1 flex items-center text-muted-foreground hover:bg-transparent"
                aria-label={showPassword ? "Hide password" : "Show password"}
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
