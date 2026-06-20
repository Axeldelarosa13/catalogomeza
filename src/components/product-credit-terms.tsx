import { cn, formatCurrency } from "@/lib/utils";

type CreditValue = number | null | undefined;

type CreditTermsShape = {
  credit_price: CreditValue;
  down_payment: CreditValue;
  weekly_payment: CreditValue;
};

type CreditTermsProps = {
  creditPrice: CreditValue;
  downPayment: CreditValue;
  weeklyPayment: CreditValue;
  className?: string;
  variant?: "card" | "detail";
};

const terms = [
  { key: "creditPrice", label: "Credito" },
  { key: "downPayment", label: "Enganche" },
  { key: "weeklyPayment", label: "Semanal" },
] as const;

function isFilled(value: CreditValue): value is number {
  return value !== null && value !== undefined && !Number.isNaN(value);
}

export function hasAnyCreditTerms(product: CreditTermsShape) {
  return [
    product.credit_price,
    product.down_payment,
    product.weekly_payment,
  ].some(isFilled);
}

export function hasCompleteCreditTerms(product: CreditTermsShape) {
  return [
    product.credit_price,
    product.down_payment,
    product.weekly_payment,
  ].every(isFilled);
}

export function formatCreditValue(value: CreditValue) {
  return isFilled(value) ? formatCurrency(value) : "Por llenar";
}

export function CreditTerms({
  creditPrice,
  downPayment,
  weeklyPayment,
  className,
  variant = "card",
}: CreditTermsProps) {
  const values = { creditPrice, downPayment, weeklyPayment };
  const hasTerms = Object.values(values).some(isFilled);

  if (!hasTerms) {
    return (
      <div
        className={cn(
          "rounded-lg border border-emerald-100 bg-emerald-50/80 p-3 text-sm",
          variant === "detail" && "p-4",
          className,
        )}
      >
        <p className="text-xs font-black uppercase tracking-wide text-emerald-800">
          Credito, enganche y semanal
        </p>
        <p className="mt-1 font-black text-slate-950">Por confirmar</p>
        {variant === "detail" ? (
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Estos datos quedan listos para llenarse manualmente desde el panel.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        variant === "detail"
          ? "grid grid-cols-1 gap-2 rounded-lg border border-slate-200 bg-white p-0 min-[520px]:grid-cols-3"
          : "grid grid-cols-1 gap-2 rounded-lg border border-slate-200 bg-stone-50 p-2 min-[360px]:grid-cols-3",
        className,
      )}
    >
      {terms.map((term) => (
        <div
          key={term.key}
          className={cn(
            "min-w-0 rounded-md bg-white px-2 py-2 shadow-sm",
            variant === "detail" && "border border-slate-200 px-3 py-3 shadow-none",
          )}
        >
          <p className="text-[10px] font-black uppercase tracking-wide text-slate-500 sm:text-xs">
            {term.label}
          </p>
          <p
            className={cn(
              "mt-1 break-words text-sm font-black leading-tight text-slate-950",
              variant === "detail" && "text-base sm:text-xl",
            )}
          >
            {formatCreditValue(values[term.key])}
          </p>
        </div>
      ))}
    </div>
  );
}
