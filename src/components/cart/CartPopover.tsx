"use client";

import Image from "next/image";
import { HiMinus, HiOutlineTrash, HiPlus, HiX } from "react-icons/hi";
import Button from "@/components/forms/Button";
import { useCartContext } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { toDollar } from "@/utils/currency";

interface CartPopoverProps {
    open: boolean;
    onClose: () => void;
}

export default function CartPopover({ open, onClose }: CartPopoverProps) {
    const {
        items,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
    } = useCartContext();

    const { showToast } = useToast();

    if (!open) return null;
    return (
        <div className="fixed inset-x-4 top-20 z-50 flex flex-col rounded-xl border border-zinc-200 bg-white shadow-xl sm:absolute sm:inset-x-auto sm:top-full sm:right-0 sm:mt-2 sm:w-96 dark:border-zinc-800 dark:bg-zinc-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Carrito
                    {totalItems > 0 && (
                        <span className="ml-2 text-xs font-normal text-zinc-500 dark:text-zinc-400">
                            {totalItems}{" "}
                            {totalItems === 1 ? "artículo" : "artículos"}
                        </span>
                    )}
                </span>
                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={onClose}
                    aria-label="Cerrar carrito"
                >
                    <HiX className="h-4 w-4" />
                </Button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        Tu carrito está vacío
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Añade productos para verlos aquí
                    </p>
                </div>
            ) : (
                <>
                    <ul className="max-h-80 divide-y divide-zinc-100 overflow-y-auto dark:divide-zinc-800">
                        {items.map(({ product, quantity }) => (
                            <li
                                key={product.id}
                                className="flex items-center gap-3 px-4 py-3"
                            >
                                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        sizes="56px"
                                        className="object-contain p-1"
                                    />
                                </div>

                                <div className="flex min-w-0 flex-1 flex-col gap-1">
                                    <p className="truncate text-xs font-medium text-zinc-900 dark:text-zinc-100">
                                        {product.title}
                                    </p>
                                    <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                        {toDollar(product.price * quantity)}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center rounded-md border border-zinc-200 dark:border-zinc-700">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateQuantity(
                                                        product.id,
                                                        quantity - 1
                                                    )
                                                }
                                                aria-label="Reducir cantidad"
                                                className="cursor-pointer px-2 py-1 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                                            >
                                                <HiMinus className="h-3 w-3" />
                                            </button>
                                            <span className="min-w-6 text-center text-xs font-medium text-zinc-900 dark:text-zinc-100">
                                                {quantity}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateQuantity(
                                                        product.id,
                                                        quantity + 1
                                                    )
                                                }
                                                aria-label="Aumentar cantidad"
                                                className="cursor-pointer px-2 py-1 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                                            >
                                                <HiPlus className="h-3 w-3" />
                                            </button>
                                        </div>
                                        <Button
                                            variant="danger"
                                            size="icon-sm"
                                            onClick={() =>
                                                removeFromCart(product.id)
                                            }
                                            aria-label="Eliminar producto"
                                        >
                                            <HiOutlineTrash className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Footer */}
                    <div className="border-t border-zinc-100 px-4 py-3 dark:border-zinc-800">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                Total
                            </span>
                            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                {toDollar(totalPrice)}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="md"
                                rounded="lg"
                                onClick={clearCart}
                                className="flex-1"
                            >
                                Vaciar carrito
                            </Button>
                            <Button
                                variant="solid"
                                size="md"
                                rounded="lg"
                                className="flex-1"
                                onClick={() => {
                                    clearCart();
                                    onClose();
                                    showToast("¡Compra realizada con éxito!");
                                }}
                            >
                                Finalizar compra
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
