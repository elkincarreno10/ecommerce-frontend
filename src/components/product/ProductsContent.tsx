"use client";

import CategorySelect from "@/components/product/CategorySelect";
import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import ProductSearchInput from "@/components/product/ProductSearchInput";
import SortButton from "@/components/product/SortButton";
import { useProductFiltersContext } from "@/context/ProductFiltersContext";

export default function ProductsContent() {
    const { filtered, isLoading, isError } = useProductFiltersContext();

    return (
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Productos
                </h1>

                <div className="flex flex-wrap items-center gap-2">
                    <ProductSearchInput />
                    <SortButton label="Precio" sortKey="price" />
                    <SortButton label="Rating" sortKey="rating" />
                    <CategorySelect />
                </div>
            </div>

            {isError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
                    Error al cargar los productos: Algo salió mal, intenta de
                    nuevo.
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {isLoading
                    ? Array.from({ length: 8 }).map((_, i) => (
                          <ProductCardSkeleton key={i + "product-skeleton"} />
                      ))
                    : filtered.map((product, index) => (
                          <ProductCard
                              key={product.id}
                              product={product}
                              priority={index < 4}
                          />
                      ))}
            </div>

            {!isLoading && !isError && filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                        No se encontraron productos
                    </p>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        Intenta con otros filtros o términos de búsqueda
                    </p>
                </div>
            )}
        </main>
    );
}
