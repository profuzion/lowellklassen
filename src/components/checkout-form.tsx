"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { site, type ProductId } from "@/content/site";
import {
  checkoutFormSchema,
  type CheckoutFormValues,
} from "@/lib/checkout-schema";

type CheckoutFormProps = {
  productId: ProductId;
  integrationPending: boolean;
};

type CheckoutResult = {
  status: "ok" | "pending" | "invalid" | "error";
  url?: string;
  message?: string;
};

export function CheckoutForm({
  productId,
  integrationPending,
}: CheckoutFormProps) {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: "",
      email: "",
      terms: false,
    },
  });

  async function onSubmit(values: CheckoutFormValues) {
    setServerMessage(null);

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, product: productId }),
    });

    const result = (await response.json()) as CheckoutResult;

    if (result.status === "ok" && result.url) {
      window.location.assign(result.url);
      return;
    }

    setServerMessage(
      result.message || site.checkout.pendingBody,
    );
  }

  return (
    <form
      className="grid gap-5"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      {integrationPending ? (
        <div
          role="status"
          className="rounded-lg border border-border bg-card p-4"
        >
          <p className="text-sm font-medium text-foreground">
            {site.checkout.pendingTitle}
          </p>
          <p className="mt-2 text-sm leading-6 text-pretty text-muted-foreground">
            {site.checkout.pendingBody}
          </p>
        </div>
      ) : null}

      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          autoComplete="name"
          className="h-11 text-base"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
        />
        {errors.name ? (
          <p id="name-error" className="text-sm text-destructive">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          className="h-11 text-base"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <div className="flex items-start gap-3">
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="terms"
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                }}
                onBlur={field.onBlur}
                aria-invalid={errors.terms ? true : undefined}
                aria-describedby={errors.terms ? "terms-error" : undefined}
              />
            )}
          />
          <Label htmlFor="terms" className="text-sm leading-6 font-normal">
            {site.checkout.termsLabel}
          </Label>
        </div>
        {errors.terms ? (
          <p id="terms-error" className="text-sm text-destructive">
            {errors.terms.message}
          </p>
        ) : null}
      </div>

      {serverMessage ? (
        <p role="status" className="text-sm text-pretty text-foreground">
          {serverMessage}
        </p>
      ) : null}

      <Button type="submit" className="h-12 rounded-full px-6" disabled={isSubmitting}>
        {isSubmitting
          ? site.checkout.submittingLabel
          : site.checkout.submitLabel}
      </Button>
      <p className="text-sm leading-6 text-pretty text-muted-foreground">
        {site.checkout.paymentNote}
      </p>
    </form>
  );
}
