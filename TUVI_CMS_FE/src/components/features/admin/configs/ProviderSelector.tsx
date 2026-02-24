import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, Sparkles, BrainCircuit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ConfigItem } from "@/services/types";

interface ProviderSelectorProps {
    currentProvider: string;
    configs: ConfigItem[];
    onSwitch: (provider: string) => void;
    isPending?: boolean;
}

const providers = [
    {
        id: "gemini",
        name: "Google Gemini",
        keyCode: "AI_API_KEY",
        icon: Sparkles,
        color: "text-blue-600",
        bgActive: "border-blue-500 bg-blue-50/50",
        badgeActive: "bg-blue-100 text-blue-700",
    },
    {
        id: "openai",
        name: "OpenAI",
        keyCode: "OPENAI_API_KEY",
        icon: BrainCircuit,
        color: "text-emerald-600",
        bgActive: "border-emerald-500 bg-emerald-50/50",
        badgeActive: "bg-emerald-100 text-emerald-700",
    },
];

export function ProviderSelector({
    currentProvider,
    configs,
    onSwitch,
    isPending,
}: ProviderSelectorProps) {
    // If value starts with "***" it means the key is set (masked by backend)
    const isKeyConfigured = (keyCode: string) => {
        const config = configs.find((c) => c.code === keyCode);
        if (!config) return false;
        return config.value && config.value.length > 0;
    };

    return (
        <div className="grid grid-cols-2 gap-3 mb-4">
            {providers.map((provider) => {
                const isActive = currentProvider === provider.id;
                const keyConfigured = isKeyConfigured(provider.keyCode);
                const Icon = provider.icon;

                return (
                    <button
                        key={provider.id}
                        type="button"
                        disabled={isPending}
                        onClick={() => !isActive && onSwitch(provider.id)}
                        className={cn(
                            "relative flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all",
                            "hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
                            isActive
                                ? provider.bgActive
                                : "border-muted bg-background hover:border-muted-foreground/20"
                        )}
                    >
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Icon className={cn("size-5", isActive ? provider.color : "text-muted-foreground")} />
                                <span className={cn("font-semibold text-sm", isActive ? "text-foreground" : "text-muted-foreground")}>
                                    {provider.name}
                                </span>
                            </div>
                            <Badge
                                variant="secondary"
                                className={cn(
                                    "text-xs",
                                    isActive ? provider.badgeActive : "bg-muted text-muted-foreground"
                                )}
                            >
                                {isActive ? "Mặc định" : "Backup"}
                            </Badge>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs">
                            {keyConfigured ? (
                                <>
                                    <CheckCircle2 className="size-3.5 text-green-500" />
                                    <span className="text-green-600">Key đã cấu hình</span>
                                </>
                            ) : (
                                <>
                                    <AlertTriangle className="size-3.5 text-amber-500" />
                                    <span className="text-amber-600">Chưa có key</span>
                                </>
                            )}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
