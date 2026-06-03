import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "icon" | "icon-sm";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
    variant?: Variant;
    size?: Size;
    rounded?: "md" | "lg";
}

const variantClasses: Record<Variant, string> = {
    solid: "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300",
    outline:
        "border border-zinc-200 text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:bg-zinc-800",
    ghost: "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
    danger: "text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950 dark:hover:text-red-400",
};

const sizeClasses: Record<Size, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-3 py-2 text-xs",
    icon: "p-2",
    "icon-sm": "p-1",
};

const roundedClasses: Record<"md" | "lg", string> = {
    md: "rounded-md",
    lg: "rounded-lg",
};

export default function Button({
    variant = "outline",
    size = "md",
    rounded = "md",
    type = "button",
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={cn(
                "inline-flex cursor-pointer items-center justify-center gap-2 font-medium transition-colors",
                roundedClasses[rounded],
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
