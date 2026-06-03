"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    HiArrowLeft,
    HiMinus,
    HiOutlineShoppingCart,
    HiPlus,
} from "react-icons/hi";
import Button from "@/components/forms/Button";
import { useCartContext } from "@/context/CartContext";
import { useProduct } from "@/hooks/useProduct";
import { toDollar } from "@/utils/currency";
import ProductDetailSkeleton from "@/components/product/ProductDetailSkeleton";

interface ProductDetailProps {
    id: number;
}

export default function ProductDetail({ id }: ProductDetailProps) {
    const router = useRouter();

    const { data: product, isLoading, isError } = useProduct(id);

    const { addToCart, updateQuantity, items } = useCartContext();

    const [localQty, setLocalQty] = useState(1);

    const cartItem = items.find((item) => item.product.id === product?.id);
    const cartQty = cartItem?.quantity ?? 0;
    const inCart = cartQty > 0;

    function handleAdd() {
        addToCart(product!, localQty);
    }

    if (isLoading) return <ProductDetailSkeleton />;

    if (isError || !product) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    No se pudo cargar el producto.
                </p>
                <Button
                    variant="outline"
                    size="md"
                    rounded="lg"
                    onClick={() => router.back()}
                >
                    <HiArrowLeft className="h-4 w-4" />
                    Volver al catálogo
                </Button>
            </div>
        );
    }

    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
            <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
                className="mb-4"
            >
                <HiArrowLeft className="h-4 w-4" />
                Volver al catálogo
            </Button>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Image */}
                <div className="relative flex h-80 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 p-8 md:h-120 dark:border-zinc-800 dark:bg-zinc-900">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain p-8"
                        priority
                    />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-4">
                    <span className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
                        {product.category}
                    </span>

                    <h1 className="text-xl leading-snug font-semibold text-zinc-900 sm:text-2xl dark:text-zinc-100">
                        {product.title}
                    </h1>

                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
                            ⭐ {product.rating.rate}
                            <span className="text-zinc-400 dark:text-zinc-600">
                                ({product.rating.count} reseñas)
                            </span>
                        </span>
                    </div>

                    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        {toDollar(product.price)}
                    </p>

                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {product.description}
                    </p>

                    <div className="mt-auto flex flex-col gap-3 pt-2">
                        {inCart ? (
                            <>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Ya tienes{" "}
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                                        {cartQty}
                                    </span>{" "}
                                    en el carrito
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center rounded-lg border border-zinc-900 bg-zinc-900 px-1 py-1 dark:border-zinc-100 dark:bg-zinc-100">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateQuantity(
                                                    product.id,
                                                    cartQty - 1
                                                )
                                            }
                                            aria-label="Reducir cantidad"
                                            className="cursor-pointer rounded-md p-1.5 text-white transition-colors hover:bg-zinc-700 dark:text-zinc-900 dark:hover:bg-zinc-300"
                                        >
                                            <HiMinus className="h-4 w-4" />
                                        </button>
                                        <span className="min-w-8 text-center text-sm font-semibold text-white dark:text-zinc-900">
                                            {cartQty}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => addToCart(product)}
                                            aria-label="Aumentar cantidad"
                                            className="cursor-pointer rounded-md p-1.5 text-white transition-colors hover:bg-zinc-700 dark:text-zinc-900 dark:hover:bg-zinc-300"
                                        >
                                            <HiPlus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                        Cantidad
                                    </span>
                                    <div className="flex items-center rounded-lg border border-zinc-200 bg-white px-1 py-1 dark:border-zinc-700 dark:bg-zinc-900">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setLocalQty((q) =>
                                                    Math.max(1, q - 1)
                                                )
                                            }
                                            aria-label="Reducir cantidad"
                                            disabled={localQty <= 1}
                                            className="cursor-pointer rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                        >
                                            <HiMinus className="h-4 w-4" />
                                        </button>
                                        <span className="min-w-8 text-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                            {localQty}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setLocalQty((q) => q + 1)
                                            }
                                            aria-label="Aumentar cantidad"
                                            className="cursor-pointer rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                        >
                                            <HiPlus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <Button
                                    variant="solid"
                                    size="md"
                                    rounded="lg"
                                    onClick={handleAdd}
                                    className="w-full py-3"
                                >
                                    <HiOutlineShoppingCart className="h-4 w-4" />
                                    Añadir al carrito
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
