import { site, type Product, type ProductId } from "@/content/site";

const productIds: ProductId[] = ["workbook", "audit"];

export function isProductId(value: string | undefined): value is ProductId {
  return productIds.includes(value as ProductId);
}

export function getProduct(value: string | undefined): Product {
  if (isProductId(value)) {
    const match = site.offers.products.find((product) => product.id === value);
    if (match) return match;
  }

  return site.offers.products[0];
}
