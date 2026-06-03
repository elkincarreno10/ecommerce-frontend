"use client";

import Input from "@/components/forms/Input";
import { useProductFiltersContext } from "@/context/ProductFiltersContext";

export default function ProductSearchInput() {
    const { searchInput, handleSearch } = useProductFiltersContext();
    return (
        <Input
            type="search"
            placeholder="Buscar productos..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
        />
    );
}
