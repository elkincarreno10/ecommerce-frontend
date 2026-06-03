"use client";

import {
    createContext,
    useCallback,
    useContext,
    useState,
    type ReactNode,
} from "react";
import { HiCheckCircle } from "react-icons/hi";

interface ToastContextValue {
    showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState<string | null>(null);

    const showToast = useCallback((msg: string) => {
        setMessage(msg);
        setTimeout(() => setMessage(null), 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {message && (
                <div className="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
                    <HiCheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                    {message}
                </div>
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx;
}
