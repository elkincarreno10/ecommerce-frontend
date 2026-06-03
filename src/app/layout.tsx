import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CartProvider from "@/context/CartContext";
import ProductFiltersProvider from "@/context/ProductFiltersContext";
import QueryProvider from "@/context/QueryProvider";
import ThemeProvider from "@/context/ThemeProvider";
import { ToastProvider } from "@/context/ToastContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "E-Commerce Store",
    description:
        "A simple e-commerce store built with Next.js, React Query, and Tailwind CSS.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="flex min-h-full flex-col">
                <ThemeProvider>
                    <QueryProvider>
                        <CartProvider>
                            <ToastProvider>
                                <Header />
                                <ProductFiltersProvider>
                                    {children}
                                </ProductFiltersProvider>
                            </ToastProvider>
                        </CartProvider>
                    </QueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
