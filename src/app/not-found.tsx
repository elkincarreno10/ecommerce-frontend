import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Página no encontrada",
};

export default function NotFound() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
            <span className="text-7xl font-bold text-zinc-200 dark:text-zinc-800">
                404
            </span>
            <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Página no encontrada
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    La página que buscas no existe o fue movida.
                </p>
            </div>
            <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
                Volver al inicio
            </Link>
        </main>
    );
}
