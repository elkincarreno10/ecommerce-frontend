"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Button from "@/components/forms/Button";
import { useClickOutside } from "@/hooks/useClickOutside";
import CartPopover from "./CartPopover";

const CartBadge = dynamic(() => import("./CartBadge"), { ssr: false });

export default function CartMenu() {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => setOpen(false), open);

    return (
        <div ref={ref} className="relative">
            <Button
                variant="ghost"
                size="icon"
                aria-label="Carrito de compras"
                onClick={() => setOpen((v) => !v)}
                className="relative"
            >
                <HiOutlineShoppingCart className="h-5 w-5" />
                <CartBadge />
            </Button>
            <CartPopover open={open} onClose={() => setOpen(false)} />
        </div>
    );
}
