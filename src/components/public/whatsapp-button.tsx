import { MessageCircle } from "lucide-react";

import { cn, getWhatsAppUrl } from "@/lib/utils";

type WhatsAppButtonProps = {
  productName?: string;
  message?: string | null;
  className?: string;
  compact?: boolean;
};

export function WhatsAppButton({
  productName,
  message,
  className,
  compact = false,
}: WhatsAppButtonProps) {
  return (
    <a
      href={getWhatsAppUrl(productName, message ?? undefined)}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "motion-pulse-ring inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-emerald-600/30",
        className,
      )}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {compact ? "WhatsApp" : "Contactar por WhatsApp"}
    </a>
  );
}
