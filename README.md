# E-Commerce Frontend

Aplicación de catálogo de productos con carrito de compras construida con Next.js 16, React 19 y TanStack Query. Consume la [Fake Store API](https://fakestoreapi.com) para obtener productos y categorías en tiempo real.

## Funcionalidades

- Listado de productos con búsqueda, filtrado por categoría y ordenamiento por precio o valoración
- Detalle de producto con selector de cantidad y añadir al carrito
- Carrito persistente en `localStorage` con popover de resumen
- Tema claro/oscuro
- Skeleton loaders durante la carga
- Toast de confirmación al finalizar compra

## Stack

| Herramienta | Uso |
|---|---|
| Next.js 16 | Framework (App Router) |
| React 19 | UI |
| TanStack Query v5 | Server state y caché |
| Tailwind CSS v4 | Estilos |
| Zod | Validación de respuestas de API |
| Axios | Cliente HTTP |
| Vitest + RTL | Tests unitarios |

## Requisitos

- Node.js 18+
- npm 9+

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Build de producción

```bash
npm run build
npm run start
```

## Tests

```bash
# Modo watch (re-ejecuta al guardar)
npm run test

# Una sola pasada
npm run test:run

# Con reporte de cobertura
npm run test:coverage
```

El reporte de cobertura en HTML se genera en `coverage/index.html`.

## Estructura del proyecto

```
src/
├── app/                  # Rutas (Next.js App Router)
│   ├── page.tsx          # Página principal — catálogo
│   └── product/[id]/     # Detalle de producto
├── components/
│   ├── cart/             # CartBadge, CartMenu, CartPopover
│   ├── forms/            # Button, Input, Select
│   └── product/          # ProductCard, ProductDetail, ProductsContent...
├── context/              # CartContext, ToastContext, QueryProvider...
├── hooks/                # useCart, useProduct, useProducts, useClickOutside...
├── services/             # Llamadas a la API (productsService)
├── schemas/              # Esquemas Zod para validación
├── types/                # Tipos TypeScript
└── utils/                # currency, cn
```

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Lint con ESLint |
| `npm run test` | Tests en modo watch |
| `npm run test:run` | Tests una sola pasada |
| `npm run test:coverage` | Tests con cobertura |
