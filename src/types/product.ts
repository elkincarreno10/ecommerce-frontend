import type { z } from "zod";
import type { ProductSchema } from "@/schemas/product";

export type Product = z.infer<typeof ProductSchema>;
