import { z } from "zod";

export const checkoutFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.email("Enter a valid email."),
  terms: z
    .boolean()
    .refine((value) => value, "Agree to continue to checkout."),
});

export const checkoutRequestSchema = checkoutFormSchema.extend({
  product: z.enum(["workbook", "audit"]),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
