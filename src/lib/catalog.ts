import type { CatalogProduct, Category } from "@/types/database";
import { mockCategories, mockProducts } from "@/lib/mock-data";

export type CatalogResult = {
  categories: Category[];
  products: CatalogProduct[];
};

function normalizeProducts(products: CatalogProduct[]) {
  return products.map((product) => {
    const sortedImages = [...(product.product_images ?? [])].sort(
      (a, b) => Number(b.is_main) - Number(a.is_main) || a.position - b.position,
    );

    return {
      ...product,
      product_images: sortedImages,
      main_image:
        sortedImages.find((image) => image.is_main) ?? sortedImages[0] ?? null,
    };
  });
}

function sortCategories(categories: Category[]) {
  return [...categories].sort(
    (a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name),
  );
}

function sortProducts(products: CatalogProduct[]) {
  return normalizeProducts(products).sort((a, b) => {
    if (a.is_featured !== b.is_featured) {
      return Number(b.is_featured) - Number(a.is_featured);
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}

function getLocalPublicCatalogData(): CatalogResult {
  return {
    categories: sortCategories(mockCategories),
    products: sortProducts(mockProducts.filter((product) => product.is_active)),
  };
}

export async function getPublicCatalogData(): Promise<CatalogResult> {
  return getLocalPublicCatalogData();
}

export async function getPublicProductBySlug(slug: string) {
  return (
    normalizeProducts(mockProducts).find(
      (product) => product.slug === slug && product.is_active,
    ) ?? null
  );
}

export async function getRelatedProducts(product: CatalogProduct) {
  const { products } = await getPublicCatalogData();

  return products
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.category_id === product.category_id || item.is_featured),
    )
    .slice(0, 3);
}
