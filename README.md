# Lombok Sportswear - E-commerce Platform

E-commerce platform untuk Lombok Sportswear dengan fitur lengkap: products, categories, cart, checkout, dan Google Authentication.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: SQLite (dev), PostgreSQL (production)
- **ORM**: Prisma
- **Authentication**: NextAuth.js (Google OAuth)
- **Styling**: Tailwind CSS
- **Runtime**: Bun

## 📋 Prerequisites

- Node.js 20+
- Bun 1.3+
- Google Cloud Console account (untuk OAuth)

## 🛠️ Setup Project

### 1. Clone & Install

```bash
git clone <repository-url>
cd lombok-sportswear
bun install
```

### 2. Environment Variables

Copy `.env.example` ke `.env`:

```bash
cp .env.example .env
```

### 3. Setup Google OAuth

#### Buat Google OAuth Credentials:

1. Buka [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create new project atau select existing project
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Application type: **Web application**
6. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.com/api/auth/callback/google` (production)
7. Copy Client ID dan Client Secret

#### Update `.env`:

```env
# Database
DATABASE_URL="file:///Users/user/Desktop/project/lombok-sportswear/prisma/dev.db"

# Google OAuth
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 4. Database Setup

```bash
# Generate Prisma Client
bun run db:generate

# Push schema ke database
bun run db:push

# Seed database (optional)
bun run db:seed
```

### 5. Run Development Server

```bash
bun run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
lombok-sportswear/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # NextAuth routes
│   │   │   ├── products/     # Products API
│   │   │   ├── categories/   # Categories API
│   │   │   └── orders/       # Orders API
│   │   ├── products/         # Products page
│   │   ├── collections/      # Collections page
│   │   ├── cart/            # Cart page
│   │   ├── checkout/        # Checkout page
│   │   ├── login/           # Login page
│   │   └── layout.tsx
│   ├── components/          # Reusable components
│   ├── lib/                 # Utilities (Prisma, dll.)
│   └── generated/           # Generated files
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed data
└── .github/
    └── workflows/           # CI/CD pipelines
```

## 🗄️ Database Schema

- **User**: User accounts dengan Google OAuth
- **Category**: Product categories (Men, Women, dll)
- **Product**: Products dengan multiple categories
- **ProductCategory**: Junction table (many-to-many)
- **Order**: Customer orders
- **OrderItem**: Items dalam order
- **PromoCode**: Promo codes untuk discounts
- **Address**: User addresses

## 🔐 Authentication

**Login dengan Google:**
1. Click "Sign In" di navbar
2. Login dengan Google account
3. Account otomatis dibuat di database

**Protected Routes:**
- `/profile` - User profile (coming soon)
- `/orders` - Order history (coming soon)

## 🚀 Deployment

### GitHub Actions CI/CD

**Setup Secrets di GitHub:**

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add secrets:
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `VERCEL_TOKEN` (untuk Vercel deployment)
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

**Pipeline Steps:**
1. **Lint** - ESLint checks
2. **Build** - Build Next.js app
3. **Test** - Run tests
4. **Deploy** - Deploy ke Vercel (main branch only)

### Vercel Deployment

**Environment Variables di Vercel:**

1. Go to Project Settings → Environment Variables
2. Add variables:
   ```env
   DATABASE_URL = <your-production-database-url>
   GOOGLE_CLIENT_ID = <your-google-client-id>
   GOOGLE_CLIENT_SECRET = <your-google-client-secret>
   NEXTAUTH_SECRET = <your-nextauth-secret>
   NEXTAUTH_URL = https://your-domain.com
   ```

3. Deploy:
   ```bash
   vercel --prod
   ```

## 🧪 Testing API

```bash
# Get all products
curl http://localhost:3000/api/products

# Get product by slug
curl http://localhost:3000/api/products/sport-zip-jacket

# Get categories
curl http://localhost:3000/api/categories

# Get category with products
curl http://localhost:3000/api/categories/men
```

## 🎨 Features

- ✅ Product catalog dengan categories
- ✅ Shopping cart
- ✅ Checkout flow
- ✅ Google OAuth authentication
- ✅ Multiple categories per product
- ✅ SEO-friendly URLs (product slugs)
- ✅ Promo code system
- ✅ Responsive design
- ✅ CI/CD dengan GitHub Actions

## 📝 Available Scripts

```bash
# Development
bun run dev          # Start dev server

# Database
bun run db:generate  # Generate Prisma Client
bun run db:push      # Push schema ke database
bun run db:migrate   # Run migrations
bun run db:seed      # Seed database

# Build & Production
bun run build        # Build for production
bun run start        # Start production server

# Lint
bun run lint         # Run ESLint
```

## 🔄 Database Migration (Production)

Untuk production dengan PostgreSQL:

```bash
# Update schema.prisma datasource provider
# provider = "postgresql"

# Push schema
bun run db:push

# Atau gunakan migrations
bun run db:migrate
```

## 📞 Support

Untuk issues atau questions, buat GitHub Issue atau hubungi development team.

## 📄 License

Copyright © 2026 Lombok Sportswear. All rights reserved.
