import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
    return (
        <input
            className={`rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-700 placeholder-zinc-400 transition-colors focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:placeholder-zinc-600 dark:focus:border-zinc-500 ${className}`}
            {...props}
        />
    );
}
