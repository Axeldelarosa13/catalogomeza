import Link from "next/link";
import Image from "next/image";

import { withBasePath } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white pb-20 md:pb-0">
      <div className="motion-sweep h-0.5 bg-gradient-to-r from-teal-500 via-amber-400 to-rose-400" />
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 text-sm text-slate-600 sm:px-6 md:grid-cols-[1.2fr_1fr] lg:px-8">
        <div className="flex gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-slate-950 shadow-md">
            <Image
              src={withBasePath("/brand/grupo-meza-logo.jpg")}
              alt="Grupo Meza"
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-black text-slate-950">Articulos Meza</p>
            <p className="mt-2 max-w-xl">
            Catalogo de articulos para cocina, hogar y mesa con contacto
            directo por WhatsApp al +52 315 120 3120.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 md:justify-end">
          <Link
            href="/catalogo"
            className="inline-flex min-h-11 items-center font-bold transition hover:-translate-y-0.5 hover:text-slate-950"
          >
            Catalogo
          </Link>
          <a
            href="https://delarosaleyva.shop"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-md border border-slate-200 bg-stone-50 px-3 text-xs font-black uppercase tracking-wide text-slate-700 transition hover:-translate-y-0.5 hover:border-teal-500 hover:bg-teal-50 hover:text-teal-800"
          >
            Creado por delarosaleyva.shop
          </a>
        </div>
      </div>
    </footer>
  );
}
