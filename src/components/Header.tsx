"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import CartMenu from "@/components/cart/CartMenu";

// ssr: false avoids hydration mismatch — resolvedTheme and localStorage are only available client-side
const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();

    function handleHome() {
        if (pathname.startsWith("/product/")) router.back();
        else router.push("/");
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <nav>
                    <button
                        type="button"
                        onClick={handleHome}
                        className="cursor-pointer text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400"
                    >
                        Inicio
                    </button>
                </nav>

                <div className="flex items-center gap-2">
                    <CartMenu />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
