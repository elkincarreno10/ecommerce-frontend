import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CartBadge from "@/components/cart/CartBadge";
import { useCartContext } from "@/context/CartContext";

vi.mock("@/context/CartContext");

const mockUseCartContext = vi.mocked(useCartContext);

describe("CartBadge", () => {
    it("no renderiza nada cuando el carrito está vacío", () => {
        mockUseCartContext.mockReturnValue({ totalItems: 0 } as never);

        const { container } = render(<CartBadge />);

        expect(container.firstChild).toBeNull();
    });

    it("muestra el número de items cuando hay productos", () => {
        mockUseCartContext.mockReturnValue({ totalItems: 3 } as never);

        render(<CartBadge />);

        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("muestra '99+' cuando hay más de 99 items", () => {
        mockUseCartContext.mockReturnValue({ totalItems: 100 } as never);

        render(<CartBadge />);

        expect(screen.getByText("99+")).toBeInTheDocument();
    });

    it("muestra exactamente 99 sin truncar", () => {
        mockUseCartContext.mockReturnValue({ totalItems: 99 } as never);

        render(<CartBadge />);

        expect(screen.getByText("99")).toBeInTheDocument();
    });
});
