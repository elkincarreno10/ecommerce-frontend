"use client";

import Select from "@/components/forms/Select";
import { useProductFiltersContext } from "@/context/ProductFiltersContext";

export default function CategorySelect() {
    const { category, handleCategory, categoryOptions } =
        useProductFiltersContext();

    return (
        <Select
            value={category}
            onChange={(e) => handleCategory(e.target.value)}
            options={categoryOptions}
        />
    );
}
