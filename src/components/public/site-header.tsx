import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Search } from "lucide-react";

import { getWhatsAppUrl, withBasePath } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/85 shadow-sm shadow-slate-950/5 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-2 px-3 py-2.5 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between sm:px-6 sm:py-3 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="motion-pulse-ring relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-slate-950 shadow-lg shadow-slate-950/15 transition duration-300 group-hover:-rotate-3 group-hover:scale-105 sm:h-12 sm:w-12">
            <Image
              src={withBasePath("/brand/grupo-meza-logo.jpg")}
              alt="Grupo Meza"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-bold uppercase tracking-wide text-slate-950 sm:text-sm">
              Articulos Meza
            </span>
            <span className="block truncate text-[11px] font-medium text-slate-500 sm:text-xs">
              Cocina y hogar
            </span>
          </span>
        </Link>

        <nav className="mobile-scrollbar-hidden -mx-1 flex min-w-0 flex-1 items-center justify-between gap-1 overflow-x-auto px-1 text-sm font-medium text-slate-700 min-[380px]:justify-end min-[380px]:gap-2">
          <Link
            href="/catalogo"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md px-2.5 py-2.5 transition duration-300 hover:-translate-y-0.5 hover:bg-stone-100 hover:text-slate-950 sm:px-3"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span className="hidden min-[320px]:inline">Catalogo</span>
          </Link>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
            className="motion-pulse-ring inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md bg-emerald-600 px-2.5 py-2.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 sm:px-3"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span className="hidden min-[340px]:inline sm:hidden">
              WhatsApp
            </span>
            <span className="hidden sm:inline">+52 315 120 3120</span>
          </a>
        </nav>
      </div>
      <div className="motion-sweep h-0.5 bg-gradient-to-r from-teal-500 via-amber-400 to-rose-400" />
    </header>
  );
}
