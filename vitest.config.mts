import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./src/__tests__/setup.ts"],
        coverage: {
            provider: "v8",
            include: ["src/**/*.{ts,tsx}"],
            exclude: ["src/__tests__/**", "src/**/*.d.ts", "src/app/**"],
            reporter: ["text", "html"],
        },
    },
});
