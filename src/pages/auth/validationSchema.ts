import { z } from "zod";

export const validationSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Name is required and must be at least 2 characters")
      .max(30, "Name must be 30 characters or less"),
    email: z.string().email({
      message: "Enter a valid email",
    }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});
