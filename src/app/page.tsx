import { Suspense } from "react";
import ProductFiltersProvider from "@/context/ProductFiltersContext";
import ProductsContent from "@/components/product/ProductsContent";

export default function Home() {
    return (
        <Suspense>
            <ProductFiltersProvider>
                <ProductsContent />
            </ProductFiltersProvider>
        </Suspense>
    );
}
