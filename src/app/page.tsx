import ProductFiltersProvider from "@/context/ProductFiltersContext";
import ProductsContent from "@/components/product/ProductsContent";

export default function Home() {
    return (
        <ProductFiltersProvider>
            <ProductsContent />
        </ProductFiltersProvider>
    );
}
