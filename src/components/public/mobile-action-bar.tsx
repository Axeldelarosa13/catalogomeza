"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Home, MessageCircle, Search } from "lucide-react";

import { cn, getWhatsAppUrl } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/catalogo", label: "Catalogo", icon: Search },
];

export function MobileActionBar() {
  const pathname = usePathname();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowTop(window.scrollY > 520);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-24 right-4 z-40 hidden h-11 w-11 items-center justify-center rounded-md bg-slate-950 text-white shadow-xl shadow-slate-950/20 transition duration-300 md:hidden",
          showTop && "flex",
        )}
        aria-label="Volver arriba"
      >
        <ArrowUp className="h-4 w-4" aria-hidden="true" />
      </button>

      <nav
        className="fixed inset-x-3 bottom-3 z-40 rounded-lg border border-white/80 bg-white/95 p-1.5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl md:hidden"
        aria-label="Navegacion rapida movil"
      >
        <div className="grid grid-cols-3 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex min-h-12 flex-col items-center justify-center gap-1 rounded-md px-2 py-1.5 text-[11px] font-black transition",
                  active
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-stone-100 hover:text-slate-950",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
            aria-label="Contactar por WhatsApp"
            className="motion-pulse-ring inline-flex min-h-12 flex-col items-center justify-center gap-1 rounded-md bg-emerald-600 px-2 py-1.5 text-[11px] font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </nav>
    </>
  );
}
