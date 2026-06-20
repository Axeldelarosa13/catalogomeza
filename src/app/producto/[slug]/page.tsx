import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  CreditCard,
  HeartHandshake,
  MessageCircle,
  PackageCheck,
  Tag,
} from "lucide-react";

import { CreditTerms } from "@/components/product-credit-terms";
import { ProductCard } from "@/components/public/product-card";
import { ProductGallery } from "@/components/public/product-gallery";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { WhatsAppButton } from "@/components/public/whatsapp-button";
import {
  getPublicCatalogData,
  getPublicProductBySlug,
  getRelatedProducts,
} from "@/lib/catalog";
import { getMainImage } from "@/lib/product-utils";
import { withBasePath } from "@/lib/utils";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const { products } = await getPublicCatalogData();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  const mainImage = getMainImage(product);
  const title = product.meta_title || product.name;
  const description =
    product.meta_description ||
    product.short_description ||
    product.description ||
    "Producto de Articulos Meza para cocina, hogar y mesa.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: mainImage
        ? [{ url: withBasePath(mainImage.url), alt: mainImage.alt ?? title }]
        : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);
  const purchaseGuides = [
    {
      title: "Pregunta por WhatsApp",
      text: "El mensaje sale con el producto para atenderte mas rapido.",
      icon: MessageCircle,
    },
    {
      title: "Confirma credito",
      text: "Credito, enganche y semanal se pueden actualizar cuando quieras.",
      icon: CreditCard,
    },
    {
      title: "Recibe acompanamiento",
      text: "Te ayudamos con medidas, colores, disponibilidad y entrega.",
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="soft-grid-bg flex-1 bg-stone-50">
        <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <Link
            href="/catalogo"
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-3 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver al catalogo
          </Link>

          <div className="mt-5 grid gap-6 sm:mt-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <ProductGallery
              images={product.product_images}
              productName={product.name}
            />

            <div className="motion-fade-up rounded-lg border border-white/80 bg-white p-4 shadow-2xl shadow-slate-950/10 sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-2.5 py-1 text-xs font-black uppercase tracking-wide text-teal-700">
                  <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                  {product.category?.name ?? "Sin categoria"}
                </span>
                {product.is_featured ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-200 px-2.5 py-1 text-xs font-black uppercase tracking-wide text-amber-950">
                    <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    Destacado
                  </span>
                ) : null}
              </div>

              <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-5xl">
                {product.name}
              </h1>
              <CreditTerms
                creditPrice={product.credit_price}
                downPayment={product.down_payment}
                weeklyPayment={product.weekly_payment}
                variant="detail"
                className="mt-5"
              />
              {product.short_description ? (
                <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                  {product.short_description}
                </p>
              ) : null}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton
                  productName={product.name}
                  message={product.whatsapp_message}
                  className="w-full sm:min-w-64 sm:w-auto"
                />
              </div>

              <div className="mt-6 grid gap-0 divide-y divide-slate-200 border-y border-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {purchaseGuides.map(({ title, text, icon: Icon }) => (
                  <div key={title} className="py-3 sm:px-3">
                    <Icon className="h-5 w-5 text-teal-700" aria-hidden="true" />
                    <p className="mt-2 text-sm font-black text-slate-950">
                      {title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <dl className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-stone-50 p-3 sm:p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    SKU
                  </dt>
                  <dd className="mt-1 font-bold text-slate-950">
                    {product.sku ?? "No asignado"}
                  </dd>
                </div>
                <div className="rounded-lg border border-slate-200 bg-stone-50 p-3 sm:p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Estado
                  </dt>
                  <dd className="mt-1 inline-flex items-center gap-2 font-bold text-emerald-700">
                    <PackageCheck className="h-4 w-4" aria-hidden="true" />
                    Disponible
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {product.description ? (
            <div className="motion-fade-up mt-6 rounded-lg border border-white/80 bg-white p-4 shadow-xl shadow-slate-950/5 sm:mt-8 sm:p-7">
              <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">
                Descripcion
              </h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600 sm:mt-4 sm:text-base sm:leading-8">
                {product.description}
              </p>
            </div>
          ) : null}

          {relatedProducts.length ? (
            <section className="mt-8 sm:mt-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
                    Relacionados
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-950">
                    Tambien puede interesarte
                  </h2>
                </div>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {relatedProducts.map((item, index) => (
                  <ProductCard key={item.id} product={item} index={index} />
                ))}
              </div>
            </section>
          ) : null}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
