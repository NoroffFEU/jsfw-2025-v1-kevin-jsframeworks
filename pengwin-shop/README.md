# Pengwin Shop

A modern e-commerce application built with [Next.js](https://nextjs.org), showcasing best practices in React development, state management, and API integration.

## Overview

Pengwin Shop is a full-featured e-commerce platform that demonstrates essential e-commerce functionality including product browsing, detailed product views, dynamic search, shopping cart management, and checkout flow.

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm, yarn, pnpm, or bun package manager

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd pengwin-shop
npm install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features Implemented

### Product Catalog

- ✅ Fetches products from `GET /online-shop` endpoint
- ✅ Displays product information: title, image, price, discount, rating
- ✅ Styled discount stickers for visual appeal

### Product Details

- ✅ Dedicated product page accessible via `GET /online-shop/<id>`
- ✅ Shows full product details: title, description, price, reviews, tags
- ✅ "Add to Cart" button with toast notifications
- ✅ Proper navigation from product list to details

### Search Functionality

- ✅ Dynamic real-time filtering as user types

### Shopping Cart

- ✅ Item count indicator in header
- ✅ Cart page displays products with prices and adjustable quantities
- ✅ Remove item functionality with toast notifications
- ✅ Accurate total cost calculation
- ✅ Cart persistence across app using state management

### Checkout & Confirmation

- ✅ Checkout button triggers success page
- ✅ Success page displays confirmation message
- ✅ Cart clears after successful checkout

### Contact Page

- ✅ Form validation for Full Name, Subject, Email, and Message
- ✅ Clear error message display

## Project Structure

```
pengwin-shop/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout pages
│   └── contact/           # Contact form page
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── ProductCard.tsx    # Product display component
│   ├── Cart/              # Cart-related components
│   └── ...
├── hooks/                 # Custom React hooks
│   └── useCart.ts         # Cart state management
├── services/              # API services
│   └── api.ts            # API endpoint functions
├── public/                # Static assets
└── README.md              # This file
```

## Key Technologies

- **Next.js** - React framework for production with SSR and static generation
- **React Hooks** - State management with `useState` and `useContext`
- **CSS/Tailwind** - Responsive styling
- **Toast Notifications** - User feedback for actions

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Integration

The application integrates with the following endpoints:

- `GET /online-shop` - Fetch all products
- `GET /online-shop/<id>` - Fetch specific product details

## State Management

Cart state is persisted across the application using React Context and custom hooks, ensuring a seamless user experience even with page navigation.

## Error Handling

- API errors display user-friendly messages
- Loading states provide visual feedback during data fetching
- Form validation with clear error messages
- Graceful fallbacks for missing data

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks Documentation](https://react.dev/reference/react)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)

## Version Control

This project maintains frequent, descriptive commits documenting feature development and bug fixes.

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue in the repository.

## AI Usage

Tool used: VSCode Copilot
Date: 08 March 2026
Purpose: Used to create a comprehensive README.md file for the project. And for placeholder text.
Outcome: The generated text was reviewed and adjusted before being put in the final project.

Tool used: ChatGpt and VSCode Copilot
Date: 02-08 March 2026
Purpose: Used for help with error handling ESLint errors and various other errors that popped up and for explaining Next.js concepts during development.
Outcome: The suggestions and explanations were used for help and to make me have better understanding, I then manually reviewed, until I implemented it in the final project.

Tool used: ChatGpt and VS Code Copilot
Date: 08 March 2026
Purpose: Used to help format the code and improve my code structure.
Outcome: Made the code look cleaner and gave me a greater understanding of how to make cleaner better formated code, it was manually reviewed until I put it into the final project.
