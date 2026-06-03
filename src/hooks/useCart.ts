import { useCallback, useEffect, useMemo, useReducer } from "react";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

const CART_STORAGE_KEY = "cart";

function loadFromStorage(): CartItem[] {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
        return [];
    }
}

type CartAction =
    | { type: "ADD"; product: Product; quantity?: number }
    | { type: "REMOVE"; productId: number }
    | { type: "UPDATE_QUANTITY"; productId: number; quantity: number }
    | { type: "CLEAR" };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
    switch (action.type) {
        case "ADD": {
            const qty = action.quantity ?? 1;
            const existing = state.find(
                (item) => item.product.id === action.product.id
            );
            if (existing) {
                return state.map((item) =>
                    item.product.id === action.product.id
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            }
            return [...state, { product: action.product, quantity: qty }];
        }
        case "REMOVE":
            return state.filter((item) => item.product.id !== action.productId);
        case "UPDATE_QUANTITY":
            if (action.quantity <= 0) {
                return state.filter(
                    (item) => item.product.id !== action.productId
                );
            }
            return state.map((item) =>
                item.product.id === action.productId
                    ? { ...item, quantity: action.quantity }
                    : item
            );
        case "CLEAR":
            return [];
    }
}

export function useCart() {
    const [items, dispatch] = useReducer(cartReducer, [], loadFromStorage);

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addToCart = useCallback((product: Product, quantity?: number) => {
        dispatch({ type: "ADD", product, quantity });
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        dispatch({ type: "REMOVE", productId });
    }, []);

    const updateQuantity = useCallback(
        (productId: number, quantity: number) => {
            dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
        },
        []
    );

    const clearCart = useCallback(() => {
        dispatch({ type: "CLEAR" });
    }, []);

    const totalItems = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    );

    const totalPrice = useMemo(
        () =>
            items.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            ),
        [items]
    );

    return {
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
    };
}
