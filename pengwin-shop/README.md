# PengWin Shop

PengWin Shop is a small e-commerce storefront built with Next.js, React, TypeScript, Tailwind CSS, and Zustand. It fetches products from the Noroff Online Shop API and includes product browsing, product details, a persistent shopping cart, checkout confirmation, toast notifications, and a validated contact form.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Zustand

## Features

- Product listing fetched from the Noroff Online Shop API
- Search by product title
- Sorting by title, price, and rating
- Product detail pages with image, price, tags, and reviews
- Add to cart functionality
- Cart quantity updates and item removal
- Persistent cart state using Zustand `persist`
- Checkout success flow
- Contact form with client-side validation
- Global loading, error, and not-found pages
- Toast notifications for cart actions

## Getting started

### Prerequisites

Install Node.js and npm.

### Installation

```bash
git clone https://github.com/NoroffFEU/jsfw-2025-v1-kevin-jsframeworks.git
cd jsfw-2025-v1-kevin-jsframeworks/pengwin-shop
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available scripts

```bash
npm run dev    # Start the development server
npm run build  # Create a production build
npm run start  # Start the production server
npm run lint   # Run ESLint
```

## Routes

- `/` - Home page with product listing, search, and sorting
- `/product/[id]` - Individual product page
- `/cart` - Shopping cart
- `/checkout/success` - Checkout confirmation page
- `/contact` - Contact form

## API

The project uses the Noroff v2 API:

- `GET https://v2.api.noroff.dev/online-shop`
- `GET https://v2.api.noroff.dev/online-shop/{id}`

The API helper lives in `src/lib/api.ts`.

## State management

Cart state is handled with Zustand in `src/stores/cartStore.ts` and persisted in browser storage using the `persist` middleware.

Toast notifications are handled in `src/stores/toastStore.ts` and rendered through `src/components/layout/toastNotification.tsx`.

## Project structure

```
pengwin-shop/
├── public/
├── src/
│   ├── app/
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── success/
│   │   │       └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── product/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── assets/
│   ├── components/
│   │   ├── cart/
│   │   ├── layout/
│   │   └── products/
│   ├── lib/
│   │   └── api.ts
│   ├── stores/
│   │   ├── cartStore.ts
│   │   └── toastStore.ts
│   └── types/
│       ├── cart.ts
│       └── product.ts
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Logo Usage

Used the penguin logo as a placeholder logo for this assignment: https://pngtree.com/freepng/penguin-logo_5761077.html

## AI usage

Tool used: VSCode Copilot Date: 08 March 2026 Purpose: Used to create a comprehensive README.md file for the project. And for placeholder text. Outcome: The generated text was reviewed and adjusted before being put in the final project.

Tool used: ChatGpt and VSCode Copilot Date: 02-08 March 2026 Purpose: Used for help with error handling ESLint errors and various other errors that popped up and for explaining Next.js concepts during development. Outcome: The suggestions and explanations were used for help and to make me have better understanding, I then manually reviewed, until I implemented it in the final project.

Tool used: ChatGpt and VS Code Copilot Date: 08 March 2026 Purpose: Used to help format the code and improve my code structure. Outcome: Made the code look cleaner and gave me a greater understanding of how to make cleaner better formated code, it was manually reviewed until I put it into the final project.
