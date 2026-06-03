export default function ProductCardSkeleton() {
    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="h-48 animate-pulse bg-zinc-100 dark:bg-zinc-800" />
            <div className="flex flex-col gap-3 p-4">
                <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                <div className="h-4 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                <div className="mt-1 flex justify-between">
                    <div className="h-4 w-16 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                    <div className="h-4 w-16 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                </div>
                <div className="mt-1 h-8 w-full animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            </div>
        </div>
    );
}
