import axiosInstance from "@/lib/axios";
import type { Product } from "@/types/product";
import { CategoryListSchema, ProductListSchema, ProductSchema } from "@/schemas/product";

export async function getProducts(): Promise<Product[]> {
    const { data } = await axiosInstance.get("/products");
    return ProductListSchema.parse(data);
}

export async function getProductById(id: number): Promise<Product> {
    const { data } = await axiosInstance.get(`/products/${id}`);
    return ProductSchema.parse(data);
}

export async function getCategories(): Promise<string[]> {
    const { data } = await axiosInstance.get("/products/categories");
    return CategoryListSchema.parse(data);
}
