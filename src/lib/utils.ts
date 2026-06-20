import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const DEFAULT_WHATSAPP_NUMBER = "5213151203120";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function withBasePath(path: string | null | undefined) {
  if (!path) return "";

  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "")
    .trim()
    .replace(/\/$/, "");

  if (!basePath || !path.startsWith("/")) return path;
  if (path === basePath || path.startsWith(`${basePath}/`)) return path;

  return `${basePath}${path}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatCurrency(value: number | null, currency = "MXN") {
  if (value === null || Number.isNaN(value)) {
    return "Por llenar";
  }

  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function getWhatsAppUrl(productName?: string, customMessage?: string) {
  const number = (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? DEFAULT_WHATSAPP_NUMBER
  ).replace(/\D/g, "");
  const text = encodeURIComponent(
    customMessage ||
      `Hola, me interesa ${productName ?? "un producto"} de Articulos Meza.`,
  );

  return `https://wa.me/${number}?text=${text}`;
}

export function compactText(value?: string | null) {
  return value?.trim() ? value.trim() : null;
}
