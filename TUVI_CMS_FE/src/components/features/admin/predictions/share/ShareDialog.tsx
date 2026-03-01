import { useMutation } from "@tanstack/react-query";
import { Check, Copy, Facebook, Loader2, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { predictionKeys } from "@/services/queries/prediction.query";

const WEB_URL = "https://web.thaiatkimhoa.vn";

interface ShareDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    predictionId?: number;
}

export function ShareDialog({
    open,
    onOpenChange,
    predictionId,
}: ShareDialogProps) {
    const [teaser, setTeaser] = useState("");
    const [copied, setCopied] = useState(false);

    const generateMutation = useMutation(predictionKeys.generateTeaser());

    const handleGenerate = useCallback(() => {
        if (!predictionId) return;
        generateMutation.mutate(predictionId, {
            onSuccess: (data) => {
                setTeaser(data.teaser);
            },
            onError: () => {
                toast.error("Không thể tạo nội dung. Vui lòng thử lại.");
            },
        });
    }, [predictionId, generateMutation]);

    // Auto-generate when dialog opens
    useEffect(() => {
        if (open && predictionId) {
            setTeaser("");
            setCopied(false);
            handleGenerate();
        }
    }, [open, predictionId]);

    const articleUrl = `${WEB_URL}/predictions/${predictionId}`;

    const handleCopy = async () => {
        const fullText = `${teaser}\n\n👉 ${articleUrl}`;
        try {
            await navigator.clipboard.writeText(fullText);
            setCopied(true);
            toast.success("Đã copy nội dung!");
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("Không thể copy. Hãy chọn text và copy thủ công.");
        }
    };

    const handleShareFacebook = () => {
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
        window.open(fbUrl, "_blank", "width=600,height=400");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[560px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Facebook className="h-5 w-5 text-blue-600" />
                        Share Facebook
                    </DialogTitle>
                    <DialogDescription>
                        AI sẽ viết đoạn giới thiệu hấp dẫn. Copy text rồi paste vào bài
                        đăng Facebook.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    {/* Teaser content */}
                    {generateMutation.isPending ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                            <p className="text-sm text-muted-foreground">
                                AI đang viết giới thiệu...
                            </p>
                        </div>
                    ) : (
                        <Textarea
                            value={teaser}
                            onChange={(e) => setTeaser(e.target.value)}
                            rows={10}
                            className="resize-none text-sm leading-relaxed"
                            placeholder="Nội dung giới thiệu sẽ xuất hiện ở đây..."
                        />
                    )}

                    {/* Article URL preview */}
                    {!generateMutation.isPending && teaser && (
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md text-xs text-muted-foreground">
                            <span className="font-medium">Link:</span>
                            <a
                                href={articleUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="truncate hover:underline text-blue-600"
                            >
                                {articleUrl}
                            </a>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 justify-end">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleGenerate}
                            disabled={generateMutation.isPending}
                        >
                            <RefreshCw
                                className={`h-4 w-4 mr-1.5 ${generateMutation.isPending ? "animate-spin" : ""}`}
                            />
                            Viết lại
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCopy}
                            disabled={!teaser || generateMutation.isPending}
                        >
                            {copied ? (
                                <Check className="h-4 w-4 mr-1.5 text-green-600" />
                            ) : (
                                <Copy className="h-4 w-4 mr-1.5" />
                            )}
                            {copied ? "Đã copy" : "Copy"}
                        </Button>

                        <Button
                            size="sm"
                            onClick={handleShareFacebook}
                            disabled={!teaser || generateMutation.isPending}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <Facebook className="h-4 w-4 mr-1.5" />
                            Đăng Facebook
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
