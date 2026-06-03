import { HiArrowDown, HiArrowUp } from "react-icons/hi";
import { useProductFiltersContext } from "@/context/ProductFiltersContext";

interface SortButtonProps {
    label: string;
    sortKey: string;
}

export default function SortButton({ label, sortKey }: SortButtonProps) {
    const {
        sortKey: activeSortKey,
        sortDir,
        handleSort,
    } = useProductFiltersContext();
    const active = activeSortKey === sortKey;

    return (
        <button
            type="button"
            onClick={() => handleSort(sortKey)}
            className={`flex cursor-pointer items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                    : "border-zinc-200 text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500"
            }`}
        >
            {label}
            {active &&
                (sortDir === "asc" ? (
                    <HiArrowUp className="h-3 w-3" />
                ) : (
                    <HiArrowDown className="h-3 w-3" />
                ))}
        </button>
    );
}
