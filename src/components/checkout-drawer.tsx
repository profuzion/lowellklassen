"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Check } from "lucide-react";

import { BrandButton } from "@/components/brand-button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { site, type ProductId } from "@/content/site";

type CheckoutContextValue = {
  openCheckout: (productId: ProductId) => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function useCheckout() {
  const value = useContext(CheckoutContext);
  if (!value) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return value;
}

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState<ProductId>("workbook");

  const value = useMemo(
    () => ({
      openCheckout: (nextId: ProductId) => {
        setProductId(nextId);
        setOpen(true);
      },
    }),
    [],
  );

  const product =
    site.offers.products.find((item) => item.id === productId) ??
    site.offers.products[0];

  return (
    <CheckoutContext.Provider value={value}>
      {children}
      <Sheet
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
        }}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader className="pr-10">
            <Badge variant="outline" className="rounded-md">
              {product.eyebrow}
            </Badge>
            <SheetTitle className="mt-3 text-2xl">{product.name}</SheetTitle>
            <SheetDescription className="text-pretty leading-6">
              {product.summary}
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 px-4 text-sm">
            <p>
              <span className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                Best for
              </span>
              <span className="mt-1 block text-pretty text-foreground">
                {product.bestFor}
              </span>
            </p>
            <p>
              <span className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                Price
              </span>
              <span className="mt-1 block text-lg text-foreground">
                {product.priceLabel}
              </span>
            </p>
            <ul className="grid gap-2">
              {product.includes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-pretty text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-pretty text-muted-foreground">
              {site.checkout.paymentNote}
            </p>
          </div>
          <SheetFooter>
            <BrandButton
              href={`/checkout?product=${product.id}`}
              onClick={() => setOpen(false)}
            >
              {site.checkout.continueLabel}
            </BrandButton>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </CheckoutContext.Provider>
  );
}

export function OpenCheckoutButton({
  productId,
  children,
  className,
}: {
  productId: ProductId;
  children: ReactNode;
  className?: string;
}) {
  const { openCheckout } = useCheckout();

  return (
    <BrandButton className={className} onClick={() => openCheckout(productId)}>
      {children}
    </BrandButton>
  );
}
