"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useProductFilters } from "@/hooks/useProductFilters";

type ProductFiltersContextValue = ReturnType<typeof useProductFilters>;

const ProductFiltersContext = createContext<ProductFiltersContextValue | null>(
    null
);

export default function ProductFiltersProvider({
    children,
}: {
    children: ReactNode;
}) {
    const value = useProductFilters();
    return (
        <ProductFiltersContext.Provider value={value}>
            {children}
        </ProductFiltersContext.Provider>
    );
}

export function useProductFiltersContext() {
    const ctx = useContext(ProductFiltersContext);
    if (!ctx) {
        throw new Error(
            "useProductFiltersContext must be used within ProductFiltersProvider"
        );
    }
    return ctx;
}
