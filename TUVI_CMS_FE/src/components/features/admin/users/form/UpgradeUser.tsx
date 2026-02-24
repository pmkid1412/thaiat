import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Repeat } from "lucide-react";
import { useEffect, type FC } from "react";
import { useForm } from "react-hook-form";

import { DateField } from "@/components/form/DateField";
import RadioGroupField from "@/components/form/RadioGroupField";
import SwitchField from "@/components/form/SwitchField";
import TextareaField from "@/components/form/TextareaField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useUserUpgradeAccountMutation } from "@/services/queries/user.query";
import { PRO_PLAN_TYPES } from "@/shared/constants";
import { ProPlanType } from "@/shared/constants/user";
import { UpgradeUserSchema, type UpgradeUserAccount } from "@/shared/schemas/upgradeAcc.schema";

interface UpgradeUserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId?: number;
}

export const UpgradeUser: FC<UpgradeUserProps> = ({
  open,
  onOpenChange,
  userId,
}) => {
  const form = useForm<UpgradeUserAccount>({
    resolver: zodResolver(UpgradeUserSchema),
    mode: "onSubmit",
    defaultValues: {
      userType: 1,
      proPlanType: "",
      proPlanStartDate: "",
      proPlanEndDate: "",
      autoRenew: false,
      upgradePlanReason: "",
    },
  });

  const mutation = useUserUpgradeAccountMutation();
  // get query client
  const queryClient = useQueryClient();

  // get user type for showing options below
  const userPlanType = form.watch("proPlanType");

  useEffect(() => {
    if (!userPlanType) return;
    if (userPlanType === ProPlanType.CUSTOM) return;

    const today = new Date();
    const toDateInput = (d: Date) => d.toISOString().split("T")[0];

    const months =
      PRO_PLAN_TYPES.find((p) => p.value === userPlanType)?.months || 0;

    if (months > 0) {
      const start = toDateInput(today);
      const end = toDateInput(
        new Date(today.getTime() + months * 30 * 24 * 60 * 60 * 1000)
      );
      form.setValue("proPlanStartDate", start, {
        shouldValidate: true,
        shouldDirty: true,
      });
      form.setValue("proPlanEndDate", end, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [userPlanType, form]);

  const handleFormSubmit = async (data: UpgradeUserAccount) => {
    if (!userId) return;
    await mutation.mutateAsync({ id: userId, data });
    onOpenChange(false);
    form.reset();

    queryClient.invalidateQueries({ queryKey: ["users"] });
    queryClient.invalidateQueries({ queryKey: ["user-overview"] });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nâng cấp gói</DialogTitle>
          <DialogDescription>
            Chọn gói nâng cấp phù hợp cho người dùng này.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-4"
          >
            <div className={cn("flex flex-col gap-4")}>
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

              <div className="flex gap-4 items-start">
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
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Hủy
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && <Spinner />} Nâng cấp
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
