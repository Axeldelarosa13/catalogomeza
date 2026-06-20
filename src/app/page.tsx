import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CreditCard,
  HeartHandshake,
  MessageCircle,
  Search,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";

import { ProductCard } from "@/components/public/product-card";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { WhatsAppButton } from "@/components/public/whatsapp-button";
import { getPublicCatalogData } from "@/lib/catalog";
import { withBasePath } from "@/lib/utils";

export default async function Home() {
  const { categories, products } = await getPublicCatalogData();
  const featured = products.filter((product) => product.is_featured).slice(0, 6);
  const productRail = (featured.length ? featured : products).slice(0, 8);
  const marqueeProducts = [...productRail, ...productRail];
  const brandTicker = [
    "Productos de calidad",
    "Confianza y respaldo",
    "Compromiso con tu bienestar",
    "Cocina",
    "Blancos",
    "Salud",
    "Todo en un solo lugar",
  ];
  const categoryHighlights = categories.map((category) => ({
    ...category,
    total: products.filter((product) => product.category_id === category.id)
      .length,
  }));
  const buyingSteps = [
    {
      title: "Explora el catalogo",
      text: "Busca por nombre, categoria o producto destacado.",
      icon: Search,
    },
    {
      title: "Pregunta por WhatsApp",
      text: "Envia el producto exacto y recibe disponibilidad.",
      icon: MessageCircle,
    },
    {
      title: "Coordina tu compra",
      text: "Confirma entrega, apartado o forma de pago.",
      icon: CreditCard,
    },
  ];
  const benefits = [
    {
      title: "Atencion directa",
      text: "Consulta dudas, medidas y promociones con una persona real.",
      icon: HeartHandshake,
    },
    {
      title: "Productos para el hogar",
      text: "Cocina, mesa, organizacion, electrodomesticos y mas.",
      icon: Store,
    },
    {
      title: "Catalogo siempre visible",
      text: "Revisa opciones desde celular, tablet o computadora.",
      icon: Truck,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative isolate overflow-hidden bg-black text-white">
          <div className="relative aspect-[2048/857] min-h-[190px] w-full overflow-hidden min-[430px]:min-h-[230px] sm:min-h-[420px] lg:max-h-[680px]">
            <Image
              src={withBasePath("/brand/grupo-meza-header.png")}
              alt="Grupo Meza: salud, cocina y blancos"
              fill
              priority
              sizes="100vw"
              className="motion-hero-breathe object-contain sm:object-cover"
            />
          </div>

          <div className="border-t border-white/10 bg-black/95">
            <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-5 sm:gap-5 sm:px-6 sm:py-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
              <div className="motion-fade-up">
                <p className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-2.5 py-1.5 text-xs font-bold uppercase tracking-wide text-emerald-200 sm:px-3 sm:text-sm">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Salud, hogar y bienestar en un solo lugar
                </p>
                <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                  Articulos Meza
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
                  Cocina, blancos y productos para equipar tu hogar con
                  atencion directa por WhatsApp.
                </p>
              </div>

              <div className="motion-fade-right grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 lg:flex lg:justify-end">
                <Link
                  href="/catalogo"
                  className="motion-shine inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-black text-slate-950 shadow-xl shadow-slate-950/20 transition duration-300 hover:-translate-y-0.5 hover:bg-amber-100 sm:w-auto sm:px-5"
                >
                  Ver catalogo
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <WhatsAppButton className="w-full bg-emerald-500 hover:bg-emerald-600 sm:w-auto" />
              </div>
            </div>

            <div className="mx-auto grid w-full max-w-7xl grid-cols-3 gap-2 px-3 pb-5 sm:gap-3 sm:px-6 sm:pb-7 lg:px-8">
              {[
                ["Productos", products.length],
                ["Categorias", categories.length],
                ["Destacados", featured.length],
              ].map(([label, value], index) => (
                <div
                  key={label}
                  style={{ animationDelay: `${index * 90 + 120}ms` }}
                  className="motion-fade-up rounded-lg border border-white/15 bg-white/10 p-3 backdrop-blur sm:p-4"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-200 sm:text-xs">
                    {label}
                  </p>
                  <p className="mt-1 text-2xl font-black sm:text-3xl">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-y border-slate-200 bg-white py-2 sm:py-3">
          <div className="motion-marquee flex w-max items-center gap-2 whitespace-nowrap sm:gap-3">
            {[...brandTicker, ...brandTicker, ...brandTicker].map(
              (item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="inline-flex items-center gap-2 rounded-md bg-stone-50 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-slate-700 sm:gap-3 sm:px-4 sm:py-2 sm:text-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-teal-600" />
                  {item}
                </span>
              ),
            )}
          </div>
        </section>

        <section className="bg-white py-8 sm:py-12">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
            <div className="motion-scroll">
              <div className="motion-float animated-border relative mx-auto aspect-square max-w-[220px] overflow-hidden rounded-lg bg-slate-950 shadow-2xl shadow-slate-950/20 sm:max-w-sm lg:mx-0">
                <Image
                  src={withBasePath("/brand/grupo-meza-logo.jpg")}
                  alt="Grupo Meza"
                  fill
                  sizes="(min-width: 1024px) 360px, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="motion-scroll">
              <p className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-1.5 text-sm font-black uppercase tracking-wide text-emerald-700">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Grupo Meza
              </p>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Salud, cocina y blancos en un solo lugar
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                Articulos Meza forma parte de Grupo Meza: una seleccion pensada
                para equipar el hogar con productos practicos, bonitos y listos
                para el dia a dia.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                {["Salud", "Cocina", "Blancos"].map((item, index) => (
                  <div
                    key={item}
                    style={{ animationDelay: `${index * 80}ms` }}
                    className="motion-fade-up rounded-lg border border-slate-200 bg-stone-50 p-3 text-center text-xs font-black text-slate-950 sm:p-4 sm:text-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {productRail.length ? (
          <section className="overflow-hidden bg-slate-950 py-8 text-white sm:py-12">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="motion-scroll flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-black uppercase tracking-wide text-emerald-200">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Lo mas pedido
                  </p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-5xl">
                    Productos que se mueven rapido
                  </h2>
                </div>
                <Link
                  href="/catalogo"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-slate-950 sm:w-auto"
                >
                  Ver catalogo
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="mt-6 overflow-hidden sm:mt-7">
              <div className="motion-marquee-slow flex w-max gap-3 px-4 sm:gap-4">
                {marqueeProducts.map((product, index) => (
                  <Link
                    key={`${product.id}-${index}`}
                    href={`/producto/${product.slug}`}
                    className="group w-48 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/10 shadow-xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/15 min-[380px]:w-52 sm:w-64"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                      {product.main_image ? (
                        <Image
                          src={withBasePath(product.main_image.url)}
                          alt={product.main_image.alt ?? product.name}
                          fill
                          sizes="256px"
                          className="object-cover transition duration-700 group-hover:scale-110"
                        />
                      ) : null}
                    </div>
                    <div className="p-3 sm:p-4">
                      <p className="text-[10px] font-black uppercase tracking-wide text-emerald-200 sm:text-xs">
                        {product.category?.name ?? "Catalogo"}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm font-black text-white sm:text-base">
                        {product.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="soft-grid-bg bg-stone-50 py-8 sm:py-12">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="motion-scroll flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 rounded-md bg-teal-50 px-3 py-1.5 text-sm font-black uppercase tracking-wide text-teal-700">
                  <Boxes className="h-4 w-4" aria-hidden="true" />
                  Productos destacados
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-5xl">
                  Seleccion principal
                </h2>
              </div>
              <Link
                href="/catalogo"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-black text-slate-800 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-950 sm:w-auto"
              >
                Ver todos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {(featured.length ? featured : products.slice(0, 6)).map(
                (product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={index === 0}
                    index={index}
                  />
                ),
              )}
            </div>
          </div>
        </section>

        <section className="bg-white py-8 sm:py-12">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="motion-scroll flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 rounded-md bg-amber-50 px-3 py-1.5 text-sm font-black uppercase tracking-wide text-amber-800">
                  <Store className="h-4 w-4" aria-hidden="true" />
                  Compra por categoria
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-5xl">
                  Encuentra rapido lo que necesitas
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categoryHighlights.map((category, index) => (
                <Link
                  key={category.id}
                  href="/catalogo"
                  style={{ animationDelay: `${index * 45}ms` }}
                  className="motion-scroll hover-tilt group rounded-lg border border-slate-200 bg-stone-50 p-4 transition duration-300 hover:border-teal-600 hover:bg-white hover:shadow-xl hover:shadow-slate-950/10 sm:p-5"
                >
                  <p className="text-lg font-black text-slate-950 transition group-hover:text-teal-700">
                    {category.name}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {category.description ?? "Productos seleccionados."}
                  </p>
                  <p className="mt-4 inline-flex rounded-md bg-white px-3 py-1 text-xs font-black text-slate-700 shadow-sm">
                    {category.total} productos
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="soft-grid-bg bg-stone-50 py-8 sm:py-12">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="motion-scroll">
                <p className="inline-flex items-center gap-2 rounded-md bg-teal-50 px-3 py-1.5 text-sm font-black uppercase tracking-wide text-teal-700">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Compra simple
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-5xl">
                  Del catalogo a WhatsApp en segundos
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Cada producto tiene su boton para enviar el mensaje ya armado
                  al numero de Articulos Meza: +52 315 120 3120.
                </p>
                <div className="mt-6">
                  <WhatsAppButton className="w-full sm:w-auto" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {buyingSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.title}
                      style={{ animationDelay: `${index * 90}ms` }}
                      className="motion-scroll hover-tilt rounded-lg border border-white/80 bg-white p-4 shadow-sm transition duration-300 hover:shadow-xl hover:shadow-slate-950/10 sm:p-5"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-slate-950 text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 font-black text-slate-950">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {step.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-8 sm:py-12">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    style={{ animationDelay: `${index * 80}ms` }}
                    className="motion-scroll animated-border rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10 sm:p-5"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-teal-700 text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-black text-slate-950">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {benefit.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
