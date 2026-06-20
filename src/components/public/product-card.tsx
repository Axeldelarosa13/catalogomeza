import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Package } from "lucide-react";

import {
  CreditTerms,
  hasAnyCreditTerms,
} from "@/components/product-credit-terms";
import { WhatsAppButton } from "@/components/public/whatsapp-button";
import { getMainImage } from "@/lib/product-utils";
import { cn, withBasePath } from "@/lib/utils";
import type { CatalogProduct } from "@/types/database";

type ProductCardProps = {
  product: CatalogProduct;
  className?: string;
  priority?: boolean;
  index?: number;
};

export function ProductCard({
  product,
  className,
  priority = false,
  index = 0,
}: ProductCardProps) {
  const image = getMainImage(product);
  const animationDelay = `${Math.min(index, 10) * 55}ms`;
  const hasCredit = hasAnyCreditTerms(product);

  return (
    <article
      style={{ animationDelay }}
      className={cn(
        "motion-scroll hover-tilt group flex h-full flex-col overflow-hidden rounded-lg border border-white bg-white shadow-sm transition duration-500 hover:border-teal-100 hover:shadow-2xl hover:shadow-slate-950/15",
        className,
      )}
    >
      <Link
        href={`/producto/${product.slug}`}
        className="motion-shine relative block aspect-[5/4] overflow-hidden bg-stone-100"
      >
        {image ? (
          <Image
            src={withBasePath(image.url)}
            alt={image.alt ?? product.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 540px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-110"
            priority={priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Sin imagen
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/65 to-transparent opacity-85 transition group-hover:opacity-100" />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1.5 sm:left-3 sm:top-3">
          <span className="inline-flex items-center gap-1 rounded-md bg-white/92 px-2 py-1 text-[11px] font-black uppercase tracking-wide text-slate-800 shadow-sm backdrop-blur">
            <Package className="h-3.5 w-3.5 text-teal-700" aria-hidden="true" />
            {product.category?.name ?? "Catalogo"}
          </span>
          {product.sku ? (
            <span className="rounded-md bg-slate-950/85 px-2 py-1 text-[11px] font-black uppercase tracking-wide text-white backdrop-blur">
              {product.sku}
            </span>
          ) : null}
        </div>
        {product.is_featured ? (
          <span className="motion-pulse-ring absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-md bg-amber-300 px-2 py-1 text-[11px] font-black text-slate-950 shadow-lg shadow-amber-500/20 sm:text-xs">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Destacado
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "rounded-md px-2 py-1 text-[11px] font-black uppercase tracking-wide",
              hasCredit
                ? "bg-emerald-50 text-emerald-800"
                : "bg-stone-100 text-slate-600",
            )}
          >
            {hasCredit ? "Credito listo" : "Credito por confirmar"}
          </span>
          {!product.is_active ? (
            <span className="rounded-md bg-rose-50 px-2 py-1 text-[11px] font-black uppercase tracking-wide text-rose-700">
              Inactivo
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 line-clamp-2 min-h-11 text-base font-black leading-snug text-slate-950 sm:min-h-[3.15rem] sm:text-lg">
          <Link
            href={`/producto/${product.slug}`}
            className="block min-h-11 transition hover:text-teal-700"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-600">
          {product.short_description ?? product.description}
        </p>
        <CreditTerms
          creditPrice={product.credit_price}
          downPayment={product.down_payment}
          weeklyPayment={product.weekly_payment}
          className="mt-4"
        />

        <div className="mt-auto flex flex-col gap-2 pt-4 min-[380px]:flex-row">
          <Link
            href={`/producto/${product.slug}`}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm font-bold text-slate-800 transition duration-300 hover:-translate-y-0.5 hover:border-slate-950 hover:text-slate-950"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            Detalles
          </Link>
          <WhatsAppButton
            productName={product.name}
            message={product.whatsapp_message}
            className="flex-1"
            compact
          />
        </div>
      </div>
    </article>
  );
}
