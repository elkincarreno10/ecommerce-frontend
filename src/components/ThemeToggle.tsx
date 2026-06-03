"use client";

import { useTheme } from "next-themes";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import Button from "@/components/forms/Button";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            aria-label="Cambiar tema"
            onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
        >
            {resolvedTheme === "dark" ? (
                <HiOutlineSun className="h-5 w-5" />
            ) : (
                <HiOutlineMoon className="h-5 w-5" />
            )}
        </Button>
    );
}
