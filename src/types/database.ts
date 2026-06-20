export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  sku: string | null;
  price: number | null;
  currency: string;
  credit_price: number | null;
  down_payment: number | null;
  weekly_payment: number | null;
  is_active: boolean;
  is_featured: boolean;
  whatsapp_message: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  storage_path: string | null;
  url: string;
  alt: string | null;
  is_main: boolean;
  position: number;
  created_at: string;
};

export type CatalogProduct = Product & {
  category: Category | null;
  product_images: ProductImage[];
  main_image: ProductImage | null;
};
