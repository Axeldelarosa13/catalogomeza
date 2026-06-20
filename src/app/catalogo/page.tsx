import type { Metadata } from "next";

import { CatalogBrowser } from "@/components/public/catalog-browser";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { getPublicCatalogData } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Catalogo de productos",
  description:
    "Explora articulos de cocina, hogar y mesa con busqueda en tiempo real y filtros por categoria.",
};

export default async function CatalogPage() {
  const { categories, products } = await getPublicCatalogData();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-stone-50">
        <CatalogBrowser categories={categories} products={products} />
      </main>
      <SiteFooter />
    </div>
  );
}
