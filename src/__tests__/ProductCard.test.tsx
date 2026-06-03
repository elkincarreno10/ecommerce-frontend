import { useRouter } from "next/navigation";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ProductCard from "@/components/product/ProductCard";
import { useCartContext } from "@/context/CartContext";
import type { Product } from "@/types/product";

vi.mock("next/navigation");
vi.mock("next/image", () => ({
    default: ({ src, alt }: { src: string; alt: string }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} />
    ),
}));
vi.mock("@/context/CartContext");

const mockPush = vi.fn();
const mockAddToCart = vi.fn();
const mockUpdateQuantity = vi.fn();

vi.mocked(useRouter).mockReturnValue({ push: mockPush } as never);

const product: Product = {
    id: 1,
    title: "Camiseta de prueba",
    price: 29.99,
    description: "Una camiseta",
    category: "clothing",
    image: "https://example.com/shirt.jpg",
    rating: { rate: 4.5, count: 120 },
};

function setupCart(quantity = 0) {
    vi.mocked(useCartContext).mockReturnValue({
        items: quantity > 0 ? [{ product, quantity }] : [],
        addToCart: mockAddToCart,
        updateQuantity: mockUpdateQuantity,
    } as never);
}

describe("ProductCard", () => {
    describe("renderizado", () => {
        it("muestra el título del producto", () => {
            setupCart();
            render(<ProductCard product={product} />);
            expect(screen.getByText("Camiseta de prueba")).toBeInTheDocument();
        });

        it("muestra el precio formateado", () => {
            setupCart();
            render(<ProductCard product={product} />);
            expect(screen.getByText("$29.99")).toBeInTheDocument();
        });

        it("muestra la categoría", () => {
            setupCart();
            render(<ProductCard product={product} />);
            expect(screen.getByText("clothing")).toBeInTheDocument();
        });

        it("muestra el rating y el número de reseñas", () => {
            setupCart();
            render(<ProductCard product={product} />);
            expect(screen.getByText(/4\.5/)).toBeInTheDocument();
            expect(screen.getByText(/120/)).toBeInTheDocument();
        });

        it("muestra la imagen con el alt correcto", () => {
            setupCart();
            render(<ProductCard product={product} />);
            expect(
                screen.getByAltText("Camiseta de prueba")
            ).toBeInTheDocument();
        });
    });

    describe("cuando el producto no está en el carrito", () => {
        it("muestra el botón de añadir al carrito", () => {
            setupCart(0);
            render(<ProductCard product={product} />);
            expect(screen.getByText("Añadir al carrito")).toBeInTheDocument();
        });

        it("llama a addToCart al hacer click en el botón", async () => {
            setupCart(0);
            render(<ProductCard product={product} />);

            await userEvent.click(screen.getByText("Añadir al carrito"));

            expect(mockAddToCart).toHaveBeenCalledWith(product);
        });

        it("no navega al hacer click en el botón del carrito", async () => {
            setupCart(0);
            render(<ProductCard product={product} />);

            await userEvent.click(screen.getByText("Añadir al carrito"));

            expect(mockPush).not.toHaveBeenCalled();
        });
    });

    describe("cuando el producto está en el carrito", () => {
        it("muestra los controles de cantidad", () => {
            setupCart(2);
            render(<ProductCard product={product} />);
            expect(screen.getByText("2")).toBeInTheDocument();
            expect(
                screen.getByLabelText("Reducir cantidad")
            ).toBeInTheDocument();
            expect(
                screen.getByLabelText("Aumentar cantidad")
            ).toBeInTheDocument();
        });

        it("llama a updateQuantity al reducir", async () => {
            setupCart(2);
            render(<ProductCard product={product} />);

            await userEvent.click(screen.getByLabelText("Reducir cantidad"));

            expect(mockUpdateQuantity).toHaveBeenCalledWith(product.id, 1);
        });

        it("llama a addToCart al aumentar", async () => {
            setupCart(2);
            render(<ProductCard product={product} />);

            await userEvent.click(screen.getByLabelText("Aumentar cantidad"));

            expect(mockAddToCart).toHaveBeenCalledWith(product);
        });

        it("no navega al hacer click en los controles de cantidad", async () => {
            setupCart(2);
            render(<ProductCard product={product} />);

            await userEvent.click(screen.getByLabelText("Reducir cantidad"));
            await userEvent.click(screen.getByLabelText("Aumentar cantidad"));

            expect(mockPush).not.toHaveBeenCalled();
        });

        it("no navega al hacer click en el número de cantidad", async () => {
            setupCart(2);
            render(<ProductCard product={product} />);

            await userEvent.click(screen.getByText("2"));

            expect(mockPush).not.toHaveBeenCalled();
        });
    });

    describe("navegación", () => {
        it("navega al detalle del producto al hacer click en el card", async () => {
            setupCart(0);
            render(<ProductCard product={product} />);

            await userEvent.click(screen.getByRole("article"));

            expect(mockPush).toHaveBeenCalledWith(`/product/${product.id}`);
        });
    });
});
