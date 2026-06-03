import ProductDetail from "@/components/product/ProductDetail";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <ProductDetail id={Number(id)} />;
}
