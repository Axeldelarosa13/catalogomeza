"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Filter,
  HeartHandshake,
  MessageCircle,
  PackageCheck,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ProductCard } from "@/components/public/product-card";
import { WhatsAppButton } from "@/components/public/whatsapp-button";
import { getMainImage } from "@/lib/product-utils";
import { cn, withBasePath } from "@/lib/utils";
import type { CatalogProduct, Category } from "@/types/database";

type CatalogBrowserProps = {
  products: CatalogProduct[];
  categories: Category[];
};

type QuickFilter = "all" | "featured" | "credit";
type SortBy = "featured" | "name" | "category";

const quickFilters: Array<{
  id: QuickFilter;
  label: string;
}> = [
  { id: "all", label: "Todo" },
  { id: "featured", label: "Destacados" },
  { id: "credit", label: "Con credito" },
];

const trustItems: Array<{
  label: string;
  icon: LucideIcon;
}> = [
  { label: "Calidad", icon: PackageCheck },
  { label: "Credito", icon: ShieldCheck },
  { label: "Atencion", icon: HeartHandshake },
];

const catalogAssurance: Array<{
  title: string;
  text: string;
  icon: LucideIcon;
}> = [
  {
    title: "Respuesta directa",
    text: "Pregunta por disponibilidad y colores desde WhatsApp.",
    icon: MessageCircle,
  },
  {
    title: "Credito editable",
    text: "Cada producto puede llevar credito, enganche y semanal.",
    icon: CreditCard,
  },
  {
    title: "Compra acompanada",
    text: "Te ayudamos a elegir el articulo correcto para tu hogar.",
    icon: HeartHandshake,
  },
];

function hasCreditInfo(product: CatalogProduct) {
  return [
    product.credit_price,
    product.down_payment,
    product.weekly_payment,
  ].some((value) => value !== null && value !== undefined);
}

export function CatalogBrowser({ products, categories }: CatalogBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("featured");

  const activeCategories = useMemo(
    () => categories.filter((item) => item.is_active !== false),
    [categories],
  );

  const featuredProducts = useMemo(
    () => products.filter((product) => product.is_featured),
    [products],
  );

  const creditReadyCount = useMemo(
    () => products.filter(hasCreditInfo).length,
    [products],
  );

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();

    products.forEach((product) => {
      if (!product.category_id) return;
      counts.set(product.category_id, (counts.get(product.category_id) ?? 0) + 1);
    });

    return counts;
  }, [products]);

  const heroProduct = featuredProducts[0] ?? products[0] ?? null;
  const heroImage = heroProduct ? getMainImage(heroProduct) : null;
  const selectedCategory = activeCategories.find((item) => item.id === category);
  const activeQuickFilter = quickFilters.find((item) => item.id === quickFilter);
  const hasActiveFilters =
    query.trim().length > 0 || category !== "all" || quickFilter !== "all";
  const quickFilterCounts: Record<QuickFilter, number> = {
    all: products.length,
    featured: featuredProducts.length,
    credit: creditReadyCount,
  };

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setQuickFilter("all");
  }

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const results = products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category_id === category;
      const searchable = [
        product.name,
        product.short_description,
        product.description,
        product.sku,
        product.category?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesQuickFilter =
        quickFilter === "all" ||
        (quickFilter === "featured" && product.is_featured) ||
        (quickFilter === "credit" && hasCreditInfo(product));

      return (
        matchesCategory &&
        matchesQuickFilter &&
        searchable.includes(normalizedQuery)
      );
    });

    return results.sort((first, second) => {
      if (sortBy === "name") return first.name.localeCompare(second.name);
      if (sortBy === "category") {
        return (first.category?.name ?? "").localeCompare(
          second.category?.name ?? "",
        );
      }

      return Number(second.is_featured) - Number(first.is_featured);
    });
  }, [category, query, quickFilter, sortBy, products]);

  return (
    <section className="soft-grid-bg pb-10 sm:pb-14 lg:pb-16">
      <div className="relative isolate overflow-hidden bg-slate-950 text-white">
        <Image
          src={withBasePath("/brand/grupo-meza-header.png")}
          alt="Grupo Meza"
          fill
          priority
          sizes="100vw"
          className="motion-hero-breathe object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,_rgba(2,6,23,0.98)_0%,_rgba(2,6,23,0.86)_44%,_rgba(15,23,42,0.42)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-stone-50 to-transparent" />

        <div className="relative mx-auto grid w-full max-w-[90rem] gap-5 px-4 pb-12 pt-7 sm:gap-6 sm:px-6 sm:pb-20 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,430px)] lg:items-end lg:px-8 xl:pb-24">
          <div className="motion-fade-up max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-emerald-200 backdrop-blur sm:text-sm">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Catalogo Grupo Meza
              </span>
              <span className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-amber-200 backdrop-blur sm:text-sm">
                <CreditCard className="h-4 w-4" aria-hidden="true" />
                Credito disponible
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-black leading-[0.98] tracking-tight text-balance min-[380px]:text-[2.45rem] sm:text-6xl lg:text-7xl">
              Articulos Meza para equipar tu cocina
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base sm:leading-8">
              Baterias, ollas, vajillas, organizadores y electrodomesticos con
              atencion directa por WhatsApp y opciones de pago por producto.
            </p>

            <div className="mt-6 grid gap-2 min-[420px]:grid-cols-2 sm:flex sm:flex-row">
              <a
                href="#productos"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-black text-slate-950 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-amber-100"
              >
                Ver catalogo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#filtros"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-950"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Buscar productos
              </a>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-2">
              {[
                ["Productos", products.length],
                ["Categorias", activeCategories.length],
                ["Destacados", featuredProducts.length],
              ].map(([label, value], index) => (
                <div
                  key={label}
                  style={{ animationDelay: `${index * 80}ms` }}
                  className="motion-fade-up rounded-lg border border-white/15 bg-white/10 p-3 shadow-lg shadow-black/10 backdrop-blur"
                >
                  <p className="text-[10px] font-black uppercase tracking-wide text-emerald-200 sm:text-xs">
                    {label}
                  </p>
                  <p className="mt-1 text-2xl font-black">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="motion-fade-right hero-product-card relative overflow-hidden rounded-lg border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/25 backdrop-blur sm:p-4">
            <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-md bg-amber-300 px-2 py-1 text-[11px] font-black uppercase tracking-wide text-slate-950">
              <Star className="h-3.5 w-3.5 fill-slate-950" aria-hidden="true" />
              En vitrina
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-slate-900">
              {heroImage ? (
                <Image
                  src={withBasePath(heroImage.url)}
                  alt={heroImage.alt ?? heroProduct?.name ?? "Producto destacado"}
                  fill
                  priority
                  sizes="(min-width: 1024px) 430px, 100vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              ) : (
                <div className="grid h-full place-items-center text-sm text-slate-300">
                  Articulos Meza
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/85 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-xs font-black uppercase tracking-wide text-emerald-200">
                  Producto destacado
                </p>
                <h2 className="mt-1 line-clamp-2 text-xl font-black leading-tight">
                  {heroProduct?.name ?? "Catalogo Articulos Meza"}
                </h2>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {trustItems.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-md bg-white/10 px-2 py-2 text-xs font-black text-white"
                >
                  <Icon className="mx-auto mb-1 h-4 w-4 text-emerald-300" aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div
          id="filtros"
          className="motion-scroll animated-border -mt-8 rounded-lg border border-white/80 bg-white/95 p-4 shadow-2xl shadow-slate-950/10 backdrop-blur sm:-mt-12 sm:p-6"
        >
          <div className="grid gap-4">
            <div className="relative w-full">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nombre, SKU o categoria"
                className="h-12 w-full rounded-md border border-slate-200 bg-white pl-10 pr-10 text-sm font-bold text-slate-950 shadow-sm transition duration-300 placeholder:font-medium placeholder:text-slate-400 focus:-translate-y-0.5 focus:border-teal-600 focus:shadow-lg focus:shadow-teal-700/10"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
                  aria-label="Limpiar busqueda"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="mobile-scrollbar-hidden -mx-4 flex snap-x items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
              <span className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-slate-700">
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Vista
              </span>
              {quickFilters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setQuickFilter(item.id)}
                  className={cn(
                    "min-h-11 shrink-0 snap-start whitespace-nowrap rounded-md border px-3 py-2.5 text-sm font-bold transition duration-300 hover:-translate-y-0.5",
                    quickFilter === item.id
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-950",
                  )}
                >
                  {item.label}
                  <span className="ml-1 text-xs opacity-70">
                    {quickFilterCounts[item.id]}
                  </span>
                </button>
              ))}
            </div>

            <label className="grid min-h-11 grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-md border border-slate-200 bg-stone-50 px-3 py-2 text-sm font-bold text-slate-700 sm:flex">
              Orden
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortBy)}
                className="min-h-11 min-w-0 rounded-md border border-slate-200 bg-white px-2 py-2 text-sm font-bold text-slate-950 sm:min-w-52"
              >
                <option value="featured">Destacados primero</option>
                <option value="name">Nombre A-Z</option>
                <option value="category">Categoria</option>
              </select>
            </label>
          </div>

          <div className="mobile-scrollbar-hidden -mx-4 mt-4 flex snap-x items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-slate-700">
              <Filter className="h-4 w-4" aria-hidden="true" />
              Categorias
            </span>
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={cn(
                "min-h-11 shrink-0 snap-start whitespace-nowrap rounded-md border px-3 py-2.5 text-sm font-bold transition duration-300 hover:-translate-y-0.5",
                category === "all"
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-950",
              )}
            >
              Todas
            </button>
            {activeCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                className={cn(
                  "min-h-11 shrink-0 snap-start whitespace-nowrap rounded-md border px-3 py-2.5 text-sm font-bold transition duration-300 hover:-translate-y-0.5",
                  category === item.id
                    ? "border-teal-700 bg-teal-700 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-teal-700",
                )}
              >
                {item.name}
                <span className="ml-1 text-xs opacity-70">
                  {categoryCounts.get(item.id) ?? 0}
                </span>
              </button>
            ))}
          </div>

          {hasActiveFilters ? (
            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-teal-100 bg-teal-50 p-3">
              <span className="inline-flex min-h-9 items-center rounded-md bg-white px-3 text-xs font-black uppercase tracking-wide text-teal-800 shadow-sm">
                Filtros activos
              </span>
              {query ? (
                <span className="inline-flex min-h-9 items-center rounded-md border border-teal-200 bg-white px-3 text-sm font-bold text-slate-700">
                  Busqueda: {query}
                </span>
              ) : null}
              {selectedCategory ? (
                <span className="inline-flex min-h-9 items-center rounded-md border border-teal-200 bg-white px-3 text-sm font-bold text-slate-700">
                  Categoria: {selectedCategory.name}
                </span>
              ) : null}
              {quickFilter !== "all" && activeQuickFilter ? (
                <span className="inline-flex min-h-9 items-center rounded-md border border-teal-200 bg-white px-3 text-sm font-bold text-slate-700">
                  Vista: {activeQuickFilter.label}
                </span>
              ) : null}
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex min-h-9 items-center gap-2 rounded-md bg-slate-950 px-3 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:bg-teal-700"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Limpiar
              </button>
            </div>
          ) : null}

          <div className="mt-5 grid gap-2 sm:grid-cols-[auto_1fr_auto] sm:items-center">
            <div className="inline-flex w-fit rounded-md bg-stone-100 px-3 py-2 text-sm font-bold text-slate-700">
              {filteredProducts.length} producto
              {filteredProducts.length === 1 ? "" : "s"}
            </div>
            <p className="text-sm font-semibold text-slate-600">
              {selectedCategory
                ? selectedCategory.description ?? selectedCategory.name
                : "Encuentra piezas para cocinar, organizar y servir mejor."}
            </p>
            <div className="hidden items-center gap-2 text-xs font-black uppercase tracking-wide text-emerald-700 sm:inline-flex">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp por producto
            </div>
          </div>
        </div>

        <div className="mobile-scrollbar-hidden -mx-4 mt-6 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {activeCategories.slice(0, 4).map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              style={{ animationDelay: `${index * 70}ms` }}
              className={cn(
                "motion-scroll group min-w-[245px] snap-start text-left rounded-lg border bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10 sm:min-w-0",
                category === item.id
                  ? "border-teal-700 ring-2 ring-teal-700/15"
                  : "border-white",
              )}
            >
              <div className="flex items-center justify-between gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-md bg-teal-50 text-teal-700 transition group-hover:bg-teal-700 group-hover:text-white">
                  <BadgeCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="rounded-md bg-stone-100 px-2 py-1 text-xs font-black text-slate-600">
                  {categoryCounts.get(item.id) ?? 0}
                </span>
              </div>
              <h2 className="mt-3 text-base font-black text-slate-950">
                {item.name}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">
                {item.description ?? "Selecciona esta categoria."}
              </p>
            </button>
          ))}
        </div>

        <div className="motion-scroll mt-6 overflow-hidden rounded-lg bg-slate-950 p-4 text-white shadow-2xl shadow-slate-950/15 sm:p-5 lg:p-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-emerald-200">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Atencion Articulos Meza
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                ¿Viste algo que te gusto?
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Envia el producto por WhatsApp y confirma disponibilidad,
                opciones de credito y entrega.
              </p>
            </div>
            <WhatsAppButton className="w-full bg-emerald-500 hover:bg-emerald-600 lg:w-auto" />
          </div>

          <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
            {catalogAssurance.map(({ title, text, icon: Icon }) => (
              <div key={title} className="grid grid-cols-[auto_1fr] gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-white/10 text-emerald-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-black text-white">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {filteredProducts.length ? (
        <div
          id="productos"
          className="mx-auto mt-7 grid w-full max-w-[90rem] gap-4 px-4 min-[540px]:grid-cols-2 sm:gap-5 sm:px-6 lg:grid-cols-3 lg:px-8 xl:grid-cols-4"
        >
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 3}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="motion-scroll mx-auto mt-8 max-w-7xl rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-950">
            No hay productos para esta busqueda.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Ajusta los terminos o cambia de categoria.
          </p>
        </div>
      )}
    </section>
  );
}
