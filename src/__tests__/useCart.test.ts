import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/product";

const shirt: Product = {
    id: 1,
    title: "Camiseta",
    price: 20,
    description: "",
    category: "clothing",
    image: "https://example.com/shirt.jpg",
    rating: { rate: 4.5, count: 100 },
};

const pants: Product = {
    id: 2,
    title: "Pantalón",
    price: 50,
    description: "",
    category: "clothing",
    image: "https://example.com/pants.jpg",
    rating: { rate: 4.0, count: 80 },
};

beforeEach(() => localStorage.clear());
afterEach(() => localStorage.clear());

describe("addToCart", () => {
    it("añade un producto nuevo con cantidad 1 por defecto", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addToCart(shirt));

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].product.id).toBe(shirt.id);
        expect(result.current.items[0].quantity).toBe(1);
    });

    it("añade un producto nuevo con la cantidad indicada", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addToCart(shirt, 3));

        expect(result.current.items[0].quantity).toBe(3);
    });

    it("incrementa la cantidad si el producto ya está en el carrito", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addToCart(shirt));
        act(() => result.current.addToCart(shirt));

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].quantity).toBe(2);
    });

    it("acumula cantidad personalizada sobre la existente", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addToCart(shirt, 2));
        act(() => result.current.addToCart(shirt, 3));

        expect(result.current.items[0].quantity).toBe(5);
    });

    it("mantiene productos distintos separados", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addToCart(shirt));
        act(() => result.current.addToCart(pants));

        expect(result.current.items).toHaveLength(2);
    });

    it("solo incrementa el producto correcto cuando hay varios en el carrito", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addToCart(shirt));
        act(() => result.current.addToCart(pants));
        act(() => result.current.addToCart(shirt));

        const shirtItem = result.current.items.find(
            (i) => i.product.id === shirt.id
        );
        const pantsItem = result.current.items.find(
            (i) => i.product.id === pants.id
        );
        expect(shirtItem?.quantity).toBe(2);
        expect(pantsItem?.quantity).toBe(1);
    });
});

describe("removeFromCart", () => {
    it("elimina el producto del carrito", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addToCart(shirt));
        act(() => result.current.removeFromCart(shirt.id));

        expect(result.current.items).toHaveLength(0);
    });

    it("no afecta a otros productos al eliminar", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addToCart(shirt));
        act(() => result.current.addToCart(pants));
        act(() => result.current.removeFromCart(shirt.id));

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].product.id).toBe(pants.id);
    });
});

describe("updateQuantity", () => {
    it("actualiza la cantidad del producto", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addToCart(shirt));
        act(() => result.current.updateQuantity(shirt.id, 5));

        expect(result.current.items[0].quantity).toBe(5);
    });

    it("elimina el producto si la cantidad es 0", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addToCart(shirt));
        act(() => result.current.updateQuantity(shirt.id, 0));

        expect(result.current.items).toHaveLength(0);
    });

    it("elimina el producto si la cantidad es negativa", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addToCart(shirt));
        act(() => result.current.updateQuantity(shirt.id, -1));

        expect(result.current.items).toHaveLength(0);
    });

    it("solo actualiza el producto correcto cuando hay varios en el carrito", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addToCart(shirt));
        act(() => result.current.addToCart(pants));
        act(() => result.current.updateQuantity(shirt.id, 10));

        const shirtItem = result.current.items.find(
            (i) => i.product.id === shirt.id
        );
        const pantsItem = result.current.items.find(
            (i) => i.product.id === pants.id
        );
        expect(shirtItem?.quantity).toBe(10);
        expect(pantsItem?.quantity).toBe(1);
    });
});

describe("clearCart", () => {
    it("vacía todos los productos del carrito", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addToCart(shirt));
        act(() => result.current.addToCart(pants));
        act(() => result.current.clearCart());

        expect(result.current.items).toHaveLength(0);
    });
});

describe("totalItems", () => {
    it("suma las cantidades de todos los productos", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addToCart(shirt, 2));
        act(() => result.current.addToCart(pants, 3));

        expect(result.current.totalItems).toBe(5);
    });

    it("es 0 con el carrito vacío", () => {
        const { result } = renderHook(() => useCart());
        expect(result.current.totalItems).toBe(0);
    });
});

describe("totalPrice", () => {
    it("calcula el precio total correctamente", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addToCart(shirt, 2)); // 20 * 2 = 40
        act(() => result.current.addToCart(pants, 1)); // 50 * 1 = 50

        expect(result.current.totalPrice).toBe(90);
    });

    it("es 0 con el carrito vacío", () => {
        const { result } = renderHook(() => useCart());
        expect(result.current.totalPrice).toBe(0);
    });
});

describe("persistencia en localStorage", () => {
    it("guarda el carrito en localStorage al añadir", () => {
        const { result } = renderHook(() => useCart());

        act(() => result.current.addToCart(shirt));

        const saved = JSON.parse(localStorage.getItem("cart") ?? "[]");
        expect(saved).toHaveLength(1);
        expect(saved[0].product.id).toBe(shirt.id);
    });

    it("carga el carrito desde localStorage al montar", () => {
        localStorage.setItem(
            "cart",
            JSON.stringify([{ product: shirt, quantity: 3 }])
        );

        const { result } = renderHook(() => useCart());

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].quantity).toBe(3);
    });

    it("devuelve carrito vacío si localStorage tiene JSON inválido", () => {
        localStorage.setItem("cart", "esto-no-es-json");

        const { result } = renderHook(() => useCart());

        expect(result.current.items).toHaveLength(0);
    });
});
