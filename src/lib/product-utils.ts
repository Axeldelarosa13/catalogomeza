import type { CatalogProduct, ProductImage } from "@/types/database";

export function getMainImage(product: CatalogProduct): ProductImage | null {
  return product.main_image ?? product.product_images?.[0] ?? null;
}
