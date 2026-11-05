"use client";

import { useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { site, type ProductId } from "@/content/site";

export function ProductSwitcher({ current }: { current: ProductId }) {
  const router = useRouter();

  return (
    <Tabs
      value={current}
      onValueChange={(value) => {
        if (value === "workbook" || value === "audit") {
          router.push(`/checkout?product=${value}`);
        }
      }}
    >
      <TabsList className="h-10 w-full sm:w-fit">
        {site.offers.products.map((product) => (
          <TabsTrigger key={product.id} value={product.id} className="px-3">
            {product.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
