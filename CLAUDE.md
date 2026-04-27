# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server (proxies /api → http://localhost:8080)
npm run build      # Production build
npm run lint       # ESLint check
npm run preview    # Preview production build locally
```

The backend must be running on `http://localhost:8080` for API calls to work. The Vite proxy rewrites `/api/*` to `http://localhost:8080/api/*` — no CORS config needed in dev.

## Architecture

### Routing & Layouts (`src/main.jsx`)

Three distinct layout shells with role-based access:

- **Public routes** — Landing page, `/login`, `/signup`, `/forgotpassword`
- **`/basescreen`** (`BaseScreenLayout`) — For non-admin (cashier) users: `/cashier`, `/invoice-return`, `/customer-registration`
- **`/dashboard`** (`DashboardLayout`) — Admin-only, enforced by a `ROLE_ADMIN` check; redirects to `/login` if role missing. Contains all management pages (users, products, invoices, GRN, sales, purchases, organization).

Some transaction pages also exist as standalone routes outside layouts (`/cashier`, `/addproduct`, `/purchase`, etc.).

### API Layer (`src/API/`)

- `APILinks.js` — Single source of truth for all endpoint URLs. Base URL is `/api` (relative, proxied). Dynamic endpoints are functions: `APILinks.getProductById(id)`.
- Individual API files (e.g. `APILogin.js`, `APIProducts.js`) — Axios wrappers with Bearer token auth pulled from `localStorage` (`token` key). User object is stored as JSON at `localStorage.user`.
- Auth tokens are attached manually in each API file header — there is no global Axios interceptor.

### Component Structure (`src/components/`)

Feature-first organization. Each major feature has its own folder:

- **`Dashboard/`** — Admin panel with `layout/`, `pages/`, `components/` (Sidebar, Topbar, charts), and `data/` subdirectories.
- **`BaseScreen/`** — Same structure as Dashboard but for cashier role.
- **`Cashier/`** — POS screen: `ProductSearch → CartTable → Controls → SummaryFooter + InvoicePreview`.
- **`Purchase/`**, **`InvoiceReturn/`**, **`ReturnPurchase/`** — Follow the same Header + Table + Controls + Summary pattern as Cashier.
- **`UI/`** — Reusable branded components with `HyperPOS*` prefix (`HyperPOSButton`, `HyperPOSInput`, `HyperPOSCard`, etc.).
- **`LandingPage/`** — Marketing page sections (Hero, Features, FAQ, Footer).

### Styling

- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin — no `tailwind.config.js` `content` array needed).
- Custom theme: primary purple scale (`primary-50` through `primary-950`), sidebar colors, surface colors, custom shadows and animations defined in `tailwind.config.js`.
- `src/lib/utils.js` exports `cn()` (classname merger) — use this for conditional Tailwind classes.
- `src/utils/nivoTheme.js` — Shared Nivo chart theme (purple palette) used across all dashboard charts.
- Framer Motion for page/component animations; Lenis for smooth scrolling on the landing page.

### State Management

No Redux or global Context API. State is component-local and passed via props. Toast notifications use `react-hot-toast`.

### WebSocket

`@stomp/stompjs` + `sockjs-client` are installed for real-time features. Connection logic lives in individual components that need it.
