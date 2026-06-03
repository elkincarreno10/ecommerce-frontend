import type { SelectHTMLAttributes } from "react";
import type { SelectOption } from "@/types/forms";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
    placeholder?: string;
}

export default function Select({
    options,
    placeholder,
    className = "",
    ...props
}: SelectProps) {
    return (
        <select
            className={`cursor-pointer rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-500 ${className}`}
            {...props}
        >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}
