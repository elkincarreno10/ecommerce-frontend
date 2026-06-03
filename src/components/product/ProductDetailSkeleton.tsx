export default function ProductDetailSkeleton() {
    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
            <div className="mb-6 h-4 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="h-80 animate-pulse rounded-xl bg-zinc-100 md:h-120 dark:bg-zinc-800" />
                <div className="flex flex-col gap-4">
                    <div className="h-3 w-20 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                    <div className="h-7 w-3/4 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                    <div className="h-3 w-28 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                    <div className="h-8 w-24 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                    <div className="space-y-2">
                        <div className="h-3 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                        <div className="h-3 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                        <div className="h-3 w-2/3 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                    </div>
                    <div className="mt-4 h-10 w-full animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
                </div>
            </div>
        </main>
    );
}
