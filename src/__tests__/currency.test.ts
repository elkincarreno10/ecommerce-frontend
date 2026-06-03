import { describe, expect, it } from "vitest";
import { toDollar } from "@/utils/currency";

describe("toDollar", () => {
    it("formatea un número entero con dos decimales", () => {
        expect(toDollar(10)).toBe("$10.00");
    });

    it("formatea un número con decimales", () => {
        expect(toDollar(9.99)).toBe("$9.99");
    });

    it("redondea a dos decimales", () => {
        expect(toDollar(1.005)).toBe("$1.01");
    });

    it("formatea números grandes con separador de miles", () => {
        expect(toDollar(1000)).toBe("$1,000.00");
        expect(toDollar(1234567.89)).toBe("$1,234,567.89");
    });

    it("formatea cero", () => {
        expect(toDollar(0)).toBe("$0.00");
    });

    it("formatea números negativos", () => {
        expect(toDollar(-5.5)).toBe("-$5.50");
    });
});
