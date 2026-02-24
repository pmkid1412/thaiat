import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Repeat } from "lucide-react";
import { useEffect, type FC } from "react";
import { useForm } from "react-hook-form";

import RadioGroupField from "@/components/form/RadioGroupField";
import { SelectField } from "@/components/form/SelectField";
import SwitchField from "@/components/form/SwitchField";
import TextareaField from "@/components/form/TextareaField";
import { TextField } from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { PRO_PLAN_TYPES, ProPlanType, userTypes } from "@/shared/constants";
import {
  userFormSchema,
  type UserApiRequest,
  type UserFormData,
} from "@/shared/schemas/user.schema";
import {
  addMonthsInTimeZone,
  formatDateParts,
  getDatePartsInTimeZone,
} from "@/shared/utils/datetime";
import { DateField } from "@/components/form/DateField";

interface AddOrUpdateUserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  defaultValues?: UserFormData;
  loading?: boolean;
  submitText?: string;
  onClose?: () => void;
  onSubmit: (data: UserApiRequest) => Promise<void>;
}

export const AddOrUpdateUserForm: FC<AddOrUpdateUserFormProps> = ({
  open,
  onOpenChange,
  title,
  loading,
  defaultValues,
  submitText,
  onSubmit,
  onClose,
}) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      userType: "0",
      timezone: "Asia/Ho_Chi_Minh",
      autoRenew: false,
      ...defaultValues,
    },
  });

  // get user type  for showing options below
  const userTypeValue = form.watch("userType");
  const userPlanType = form.watch("proPlanType");

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        ...defaultValues,
      });
    } else {
      form.reset({
        name: "",
        email: "",
        userType: "0",
        timezone: "Asia/Ho_Chi_Minh",
        autoRenew: false,
        dateOfBirth: "",
        timeOfBirth: "",
        placeOfBirth: "",
      });
    }
  }, [defaultValues, form]);

  useEffect(() => {
    if (
      userTypeValue !== "1" ||
      !userPlanType ||
      userPlanType === ProPlanType.CUSTOM
    )
      return;

    const today = new Date();
    const tz = form.getValues("timezone") || "Asia/Ho_Chi_Minh";
    const toDateInput = (d: Date) => {
      const p = getDatePartsInTimeZone(d, tz);
      return formatDateParts(p.year, p.month, p.day);
    };

    const months =
      PRO_PLAN_TYPES.find((p) => p.value === userPlanType)?.months || 0;

    if (months > 0) {
      const start = toDateInput(today);
      const end = addMonthsInTimeZone(today, months, tz);
      form.setValue("proPlanStartDate", start, {
        shouldValidate: true,
        shouldDirty: true,
      });
      form.setValue("proPlanEndDate", end, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [userPlanType, userTypeValue, form]);

  const handleFormSubmit = async (data: UserFormData) => {
    // Convert form data to API format (userType string -> number)
    const apiData: UserApiRequest = {
      ...data,
      userType: parseInt(data.userType, 10),
    };

    await onSubmit(apiData);
    form.reset();
    onClose?.();
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
      onClose?.();
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Thêm người dùng
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl max-h-11/12 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Điền thông tin người dùng</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex gap-4 items-start">
              <TextField
                required
                control={form.control}
                name="name"
                label="Tên"
                className="flex-1"
              />
              <TextField
                required
                control={form.control}
                name="email"
                label="Email"
                type="email"
                className="flex-1"
              />
            </div>

            <TextField
              control={form.control}
              name="avatar"
              label="Avatar URL"
              placeholder="https://..."
            />

            <div className="grid grid-cols-2 gap-4 items-start">
              <DateField
                control={form.control}
                name="dateOfBirth"
                label="Ngày sinh"
              />
              <TextField
                control={form.control}
                name="timeOfBirth"
                label="Giờ sinh"
                type="time"
              />
            </div>

            <div className="flex gap-4">
              <TextField
                className="flex-1"
                control={form.control}
                name="placeOfBirth"
                label="Nơi sinh"
              />
              <SelectField
                required
                control={form.control}
                name="userType"
                label="Gói người dùng"
                options={userTypes}
                className="w-1/2"
              />
              {/* <SelectField
                control={form.control}
                name="timezone"
                label="Múi giờ"
                options={timezones.map((tz) => ({ label: tz, value: tz }))}
                className="flex-1"
              /> */}
            </div>

            <div
              className={cn("flex flex-col gap-4", {
                hidden: userTypeValue !== "1",
              })}
            >
              <RadioGroupField
                required
                className="w-96"
                control={form.control}
                name="proPlanType"
                label="Thời hạn"
                options={PRO_PLAN_TYPES.map((p) => ({
                  label: p.label,
                  value: String(p.value),
                }))}
              />

              <div className="flex gap-4">
                <DateField
                  className="flex-1"
                  required={userPlanType === ProPlanType.CUSTOM}
                  disabled={userPlanType !== ProPlanType.CUSTOM}
                  control={form.control}
                  name="proPlanStartDate"
                  label="Ngày bắt đầu"
                />
                <DateField
                  className="flex-1"
                  required={userPlanType === ProPlanType.CUSTOM}
                  disabled={userPlanType !== ProPlanType.CUSTOM}
                  control={form.control}
                  name="proPlanEndDate"
                  label="Ngày kết thúc"
                />
              </div>

              <div className="border rounded-lg p-4">
                <SwitchField
                  control={form.control}
                  name="autoRenew"
                  label={
                    <>
                      <Repeat className="text-green-500 text-xs" size={16} /> Tự
                      động gia hạn
                    </>
                  }
                  description="Tài khoản sẽ tự động gia hạn khi hết hạn"
                />
              </div>

              <TextareaField
                control={form.control}
                name="upgradePlanReason"
                label="Lý do"
                rows={3}
              />
            </div>

            <DialogFooter>
              {/* <Button variant="secondary">Nâng cấp tài khoản</Button> */}
              <div className="flex gap-2 flex-col sm:flex-row">
                <DialogClose asChild>
                  <Button variant="outline">Hủy</Button>
                </DialogClose>
                <Button type="submit" disabled={loading}>
                  {loading && <Spinner />} {submitText}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
