import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";
import { useDebounce } from "@/hooks/useDebounce";
import { useProducts } from "@/hooks/useProducts";
import type { SelectOption } from "@/types/forms";
import type { SortDir, SortKey } from "@/types/sort";

export function useProductFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const category = searchParams.get("category") ?? "all";
    const sortKey = searchParams.get("sort") as SortKey | null;
    const sortDir = (searchParams.get("dir") ?? "asc") as SortDir;

    const [searchInput, setSearchInput] = useState(
        () => searchParams.get("q") ?? ""
    );
    const debouncedSearch = useDebounce(searchInput, 500);

    const { data: products, isLoading, isError, error } = useProducts();
    const { data: categories } = useCategories();

    const categoryOptions: SelectOption[] = [
        { value: "all", label: "Todas las categorías" },
        ...(categories?.map((cat) => ({
            value: cat,
            label: cat.charAt(0).toUpperCase() + cat.slice(1),
        })) ?? []),
    ];

    function updateParams(updates: Record<string, string | null>) {
        const params = new URLSearchParams(searchParams.toString());
        for (const [key, value] of Object.entries(updates)) {
            if (value === null) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        }
        router.replace(`?${params.toString()}`, { scroll: false });
    }

    function handleSort(key: string) {
        if (sortKey !== key) {
            updateParams({ sort: key, dir: "asc" });
        } else if (sortDir === "asc") {
            updateParams({ sort: key, dir: "desc" });
        } else {
            updateParams({ sort: null, dir: null });
        }
    }

    function handleCategory(value: string) {
        updateParams({ category: value === "all" ? null : value });
    }

    function handleSearch(value: string) {
        setSearchInput(value);
        updateParams({ q: value.trim() || null });
    }

    const filtered = useMemo(() => {
        if (!products) return [];
        const search = debouncedSearch.toLowerCase().trim();
        let list = products
            .filter((p) => category === "all" || p.category === category)
            .filter(
                (p) =>
                    !search ||
                    p.title.toLowerCase().includes(search) ||
                    p.category.toLowerCase().includes(search)
            );
        if (sortKey) {
            list = [...list].sort((a, b) => {
                const aVal = sortKey === "price" ? a.price : a.rating.rate;
                const bVal = sortKey === "price" ? b.price : b.rating.rate;
                return sortDir === "asc" ? aVal - bVal : bVal - aVal;
            });
        }
        return list;
    }, [products, category, sortKey, sortDir, debouncedSearch]);

    return {
        filtered,
        isLoading,
        isError,
        error,
        searchInput,
        handleSearch,
        category,
        sortKey,
        sortDir,
        handleSort,
        handleCategory,
        categoryOptions,
    };
}
