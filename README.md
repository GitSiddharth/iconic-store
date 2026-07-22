# Iconic Store

A headless e-commerce storefront built with SvelteKit and MedusaJS, backed by a serverless Postgres database on Neon.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | SvelteKit + TypeScript + Tailwind CSS |
| Commerce Engine | MedusaJS v2 |
| Database | Neon (Serverless Postgres) |
| Payments | Razorpay *(planned)* |
| Deployment | TBD |

## Architecture

This is a **headless commerce** setup — the storefront and the commerce engine are two independent applications that communicate over HTTP. This is the same pattern used by large-scale commerce platforms; either side can be swapped out without touching the other.

```
┌─────────────────┐         REST API          ┌──────────────────┐
│   frontend/       │  ───────────────────────▶  │    backend/        │
│   SvelteKit        │  ◀───────────────────────  │    MedusaJS v2      │
│   localhost:5173    │                             │    localhost:9000    │
└─────────────────┘                             └──────────────────┘
                                                            │
                                                            ▼
                                                   ┌──────────────────┐
                                                   │   Neon Postgres    │
                                                   └──────────────────┘
```

## Project Structure

```
iconic-store/
├── backend/                  # MedusaJS monorepo root
│   └── apps/
│       └── backend/           # Actual Medusa server
│           ├── .env            # Environment variables (not committed)
│           ├── medusa-config.ts # Module & service configuration
│           └── src/
│               ├── admin/       # Custom admin dashboard UI
│               ├── api/         # Custom API routes
│               ├── jobs/        # Scheduled background tasks
│               ├── subscribers/ # Event listeners (e.g. order.placed)
│               └── modules/     # Custom business logic modules
│
└── frontend/                 # SvelteKit storefront
    └── src/
        ├── routes/            # File-based routing (each file = a URL)
        ├── lib/                # Shared code, including the Medusa SDK client
        └── app.html            # Root HTML shell
```

## Getting Started

### Prerequisites

- Node.js v20+ (LTS)
- A Neon Postgres database ([neon.tech](https://neon.tech))
- npm

### 1. Clone and install

```bash
git clone <your-repo-url>
cd iconic-store
```

### 2. Backend setup

```bash
cd backend/apps/backend
npm install
```

Create a `.env` file (see `.env.template` for reference):

```dotenv
DATABASE_URL=postgresql://<user>:<password>@<neon-host>/<dbname>?sslmode=require
STORE_CORS=http://localhost:8000,http://localhost:5173
ADMIN_CORS=http://localhost:9000
AUTH_CORS=http://localhost:9000,http://localhost:8000,http://localhost:5173
JWT_SECRET=<your-secret>
COOKIE_SECRET=<your-secret>
```

> ⚠️ Use the **direct** (non-pooled) Neon connection string for running migrations — the pooled connection can drop long-running transactions.

Run migrations and create an admin user:

```bash
npx medusa db:migrate
npx medusa user -e admin@example.com -p yourpassword
```

Start the server:

```bash
npm run dev
```

Backend runs at `http://localhost:9000`, admin dashboard at `http://localhost:9000/app`.

### 3. Frontend setup

```bash
cd frontend
npm install
```

Add your publishable API key (generate it in the admin dashboard under Settings → Publishable API Keys) to `src/lib/medusa.ts`:

```ts
import Medusa from "@medusajs/js-sdk"

export const sdk = new Medusa({
  baseUrl: "http://localhost:9000",
  publishableKey: "pk_..."
})
```

Start the dev server:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Roadmap

- [x] Backend connected to Neon, migrations applied
- [x] Frontend fetching and rendering products
- [ ] Product images & detail pages
- [ ] Cart & checkout flow
- [ ] Customer accounts (signup/login)
- [ ] Razorpay payment integration
- [ ] Shipping configuration
- [ ] AI-powered product recommendations
- [ ] Visual/animation polish (GSAP, subtle 3D)
- [ ] Deployment (frontend + backend + domain)

## Environment Variables

Never commit `.env` files. Both `backend/apps/backend/.env` and any frontend secrets should be excluded via `.gitignore`.

## License

TBD
