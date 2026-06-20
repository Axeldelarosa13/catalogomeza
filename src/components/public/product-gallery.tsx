"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { cn, withBasePath } from "@/lib/utils";
import type { ProductImage } from "@/types/database";

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const sortedImages = useMemo(
    () =>
      [...images].sort(
        (a, b) =>
          Number(b.is_main) - Number(a.is_main) || a.position - b.position,
      ),
    [images],
  );
  const [activeId, setActiveId] = useState(sortedImages[0]?.id ?? null);
  const activeImage =
    sortedImages.find((image) => image.id === activeId) ?? sortedImages[0];

  return (
    <div className="motion-fade-up space-y-3">
      <div className="motion-shine relative aspect-[4/3] overflow-hidden rounded-lg border border-white/80 bg-white shadow-2xl shadow-slate-950/10">
        {activeImage ? (
          <Image
            src={withBasePath(activeImage.url)}
            alt={activeImage.alt ?? productName}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition duration-700 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Sin imagenes
          </div>
        )}
      </div>

      {sortedImages.length > 1 ? (
        <div className="mobile-scrollbar-hidden -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0">
          {sortedImages.map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveId(image.id)}
              className={cn(
                "relative aspect-square w-16 shrink-0 snap-start overflow-hidden rounded-md border bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 min-[380px]:w-20 sm:w-auto",
                activeImage?.id === image.id
                  ? "border-teal-700 ring-2 ring-teal-700/20"
                  : "border-slate-200 hover:border-slate-400",
              )}
              aria-label={`Ver imagen ${image.position + 1}`}
            >
              <Image
                src={withBasePath(image.url)}
                alt={image.alt ?? productName}
                fill
                sizes="120px"
                className="object-cover transition duration-500 hover:scale-110"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
