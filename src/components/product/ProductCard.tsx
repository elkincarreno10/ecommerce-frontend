"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiMinus, HiOutlineShoppingCart, HiPlus } from "react-icons/hi";
import Button from "@/components/forms/Button";
import { useCartContext } from "@/context/CartContext";
import type { Product } from "@/types/product";
import { toDollar } from "@/utils/currency";

interface ProductCardProps {
    product: Product;
    priority?: boolean;
}

export default function ProductCard({
    product,
    priority = false,
}: ProductCardProps) {
    const router = useRouter();

    const { addToCart, updateQuantity, items } = useCartContext();

    const cartItem = items.find((item) => item.product.id === product.id);
    const quantity = cartItem?.quantity ?? 0;

    return (
        <article
            onClick={() => router.push(`/product/${product.id}`)}
            className="relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
        >
            <div className="relative flex h-48 items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-800">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain p-4"
                    priority={priority}
                />
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
                <span className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
                    {product.category}
                </span>
                <h2 className="line-clamp-2 flex-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {product.title}
                </h2>
                <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {toDollar(product.price)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                        ⭐ {product.rating.rate}
                        <span className="text-zinc-400 dark:text-zinc-600">
                            ({product.rating.count})
                        </span>
                    </span>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                    {quantity === 0 ? (
                        <Button
                            variant="outline"
                            size="md"
                            rounded="lg"
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                            }}
                            className="mt-1 w-full"
                        >
                            <HiOutlineShoppingCart className="h-4 w-4" />
                            Añadir al carrito
                        </Button>
                    ) : (
                        <div className="mt-1 flex items-center justify-between rounded-lg border border-zinc-900 bg-zinc-900 px-1 py-1 dark:border-zinc-100 dark:bg-zinc-100">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateQuantity(product.id, quantity - 1);
                                }}
                                aria-label="Reducir cantidad"
                                className="cursor-pointer rounded-md p-1.5 text-white transition-colors hover:bg-zinc-700 dark:text-zinc-900 dark:hover:bg-zinc-300"
                            >
                                <HiMinus className="h-3 w-3" />
                            </button>
                            <span className="min-w-6 text-center text-xs font-semibold text-white dark:text-zinc-900">
                                {quantity}
                            </span>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                }}
                                aria-label="Aumentar cantidad"
                                className="cursor-pointer rounded-md p-1.5 text-white transition-colors hover:bg-zinc-700 dark:text-zinc-900 dark:hover:bg-zinc-300"
                            >
                                <HiPlus className="h-3 w-3" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
