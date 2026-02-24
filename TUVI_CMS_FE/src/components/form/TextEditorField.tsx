import type { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";

interface TextEditorFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  required?: boolean;
  control: Control<TFieldValues>;
  label: string;
  description?: string;
  placeholder?: string;
  className?: string;
}

export const TextEditorField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  required,
  control,
  label,
  description,
  className,
}: TextEditorFieldProps<TFieldValues, TName>) => {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "edit" | "preview")}
          >
            <div className="flex justify-between items-center">
              <FormLabel>
                {label}
                {required && <span className="text-destructive -ml-1">*</span>}
              </FormLabel>

              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="edit">Soạn thảo</TabsTrigger>
                <TabsTrigger value="preview">Xem trước</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="edit">
              <FormControl>
                <SimpleEditor
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormControl>
            </TabsContent>
            <TabsContent value="preview">
              <div
                className="p-4 min-h-[150px] prose max-w-none bg-gray-50/10 rounded-xl border-2 break-all [&_p]:m-0 [&_p]:leading-normal [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_ul[data-type=taskList]]:list-none [&_ul[data-type=taskList]]:pl-0 [&_ul[data-type=taskList]_li]:flex [&_ul[data-type=taskList]_li]:items-start [&_ul[data-type=taskList]_li]:gap-2 [&_ul[data-type=taskList]_li_label]:flex [&_ul[data-type=taskList]_li_label]:items-center"
                dangerouslySetInnerHTML={{ __html: field.value || "" }}
              />
            </TabsContent>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </Tabs>
        </FormItem>
      )}
    />
  );
};
