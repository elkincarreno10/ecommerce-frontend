import { z } from "zod";

export const RatingSchema = z.object({
    rate: z.number(),
    count: z.number().int(),
});

export const ProductSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    price: z.number(),
    description: z.string(),
    category: z.string(),
    image: z.url(),
    rating: RatingSchema,
});

export const ProductListSchema = z.array(ProductSchema);

export const CategoryListSchema = z.array(z.string());
