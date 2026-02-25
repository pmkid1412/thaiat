import { useState, useMemo, type FC } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangePasswordMutation } from "@/services/queries/auth.query";

interface ChangePasswordDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const PASSWORD_RULES = [
    { key: "length", label: "Ít nhất 8 ký tự", test: (v: string) => v.length >= 8 },
    { key: "lower", label: "Có chữ thường (a-z)", test: (v: string) => /[a-z]/.test(v) },
    { key: "upper", label: "Có chữ hoa (A-Z)", test: (v: string) => /[A-Z]/.test(v) },
    { key: "special", label: "Có số hoặc ký tự đặc biệt", test: (v: string) => /[\d\W]/.test(v) },
] as const;

export const ChangePasswordDialog: FC<ChangePasswordDialogProps> = ({
    open,
    onOpenChange,
}) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { mutateAsync, isPending } = useChangePasswordMutation();

    const ruleResults = useMemo(
        () => PASSWORD_RULES.map((rule) => ({ ...rule, passed: rule.test(newPassword) })),
        [newPassword]
    );

    const passedCount = ruleResults.filter((r) => r.passed).length;
    const allRulesPassed = passedCount === PASSWORD_RULES.length;
    const confirmMatch = newPassword === confirmPassword && confirmPassword.length > 0;
    const canSubmit = currentPassword.length > 0 && allRulesPassed && confirmMatch;

    const strengthPercent = (passedCount / PASSWORD_RULES.length) * 100;
    const strengthColor =
        passedCount <= 1
            ? "bg-red-500"
            : passedCount <= 2
                ? "bg-orange-500"
                : passedCount <= 3
                    ? "bg-yellow-500"
                    : "bg-green-500";
    const strengthLabel =
        passedCount <= 1
            ? "Yếu"
            : passedCount <= 2
                ? "Trung bình"
                : passedCount <= 3
                    ? "Khá"
                    : "Mạnh";

    const handleSubmit = async () => {
        if (!canSubmit) return;
        try {
            await mutateAsync({ currentPassword, newPassword });
            resetForm();
            onOpenChange(false);
        } catch {
            // Error toast handled by mutation onError
        }
    };

    const resetForm = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowCurrent(false);
        setShowNew(false);
        setShowConfirm(false);
    };

    const handleOpenChange = (val: boolean) => {
        if (!val) resetForm();
        onOpenChange(val);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Đổi mật khẩu</DialogTitle>
                    <DialogDescription>
                        Nhập mật khẩu hiện tại và mật khẩu mới để thay đổi.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    {/* Current Password */}
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                        <div className="relative">
                            <Input
                                id="current-password"
                                type={showCurrent ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Nhập mật khẩu hiện tại"
                                disabled={isPending}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() => setShowCurrent(!showCurrent)}
                                tabIndex={-1}
                            >
                                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                        <Label htmlFor="new-password">Mật khẩu mới</Label>
                        <div className="relative">
                            <Input
                                id="new-password"
                                type={showNew ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Nhập mật khẩu mới"
                                disabled={isPending}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() => setShowNew(!showNew)}
                                tabIndex={-1}
                            >
                                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        {/* Strength Indicator */}
                        {newPassword.length > 0 && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Độ mạnh mật khẩu</span>
                                    <span
                                        className={`font-medium ${passedCount <= 1
                                            ? "text-red-500"
                                            : passedCount <= 2
                                                ? "text-orange-500"
                                                : passedCount <= 3
                                                    ? "text-yellow-600"
                                                    : "text-green-600"
                                            }`}
                                    >
                                        {strengthLabel}
                                    </span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${strengthColor}`}
                                        style={{ width: `${strengthPercent}%` }}
                                    />
                                </div>
                                <ul className="space-y-1">
                                    {ruleResults.map((rule) => (
                                        <li
                                            key={rule.key}
                                            className={`flex items-center gap-2 text-xs ${rule.passed ? "text-green-600" : "text-muted-foreground"
                                                }`}
                                        >
                                            {rule.passed ? (
                                                <Check size={12} className="shrink-0" />
                                            ) : (
                                                <X size={12} className="shrink-0" />
                                            )}
                                            {rule.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                        <div className="relative">
                            <Input
                                id="confirm-password"
                                type={showConfirm ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Nhập lại mật khẩu mới"
                                disabled={isPending}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() => setShowConfirm(!showConfirm)}
                                tabIndex={-1}
                            >
                                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {confirmPassword.length > 0 && !confirmMatch && (
                            <p className="text-xs text-red-500">Mật khẩu xác nhận không khớp</p>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => handleOpenChange(false)}
                        disabled={isPending}
                    >
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit} disabled={!canSubmit || isPending}>
                        {isPending ? "Đang xử lý..." : "Đổi mật khẩu"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
