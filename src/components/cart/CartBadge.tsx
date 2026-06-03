"use client";

import { useCartContext } from "@/context/CartContext";

export default function CartBadge() {
    const { totalItems } = useCartContext();
    if (totalItems === 0) return null;
    return (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
            {totalItems > 99 ? "99+" : totalItems}
        </span>
    );
}
