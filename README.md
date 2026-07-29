# AuraMarket - Modern E-Commerce Platform

AuraMarket is a modern, responsive, high-performance e-commerce marketplace built using **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Inspired by leading e-commerce platforms like Jumia, Amazon, Nike, and Apple, AuraMarket delivers a sleek white UI accented with black and vibrant orange highlights.

---

## 🌟 Key Features

- **Responsive Navigation**: Sticky header with live search dropdown, category mega-menu, wishlist & cart badges, user account dropdown, and mobile navigation drawer.
- **Hero & Promotional Sections**: Auto-playing promotional slider, 24-hour flash sale deals with real-time countdown timer, and stock progress bars.
- **Product Catalog & Filtering**:
  - Filter by Category, Brand, Price Range slider, Minimum Rating, and Availability.
  - Sort by Popularity, Newest, Price (Low to High / High to Low), or Top Rated.
  - Grid View and List View layout switchers.
- **Quick View Modal**: Instant product preview with color/size pickers, stock check, and instant add-to-cart capability.
- **Product Detail Page**: High-resolution image gallery with thumbnails, specs table, key features, customer review submission, and related products.
- **Full E-Commerce Workflow**:
  - **Cart**: Quantity adjustment, coupon codes (`AURA10`, `WELCOME20`), shipping fee calculation, and grand total.
  - **Wishlist**: Save favorite products with 1-click move to cart.
  - **Checkout**: Step-by-step shipping address form and payment options (Credit Card, PayPal, Cash on Delivery, Apple Pay).
  - **Order Confirmation**: Order receipt breakdown, tracking number, and live delivery progress tracker.
- **User Accounts**: Login, Registration, Profile management with saved default address, and Order History tracking.
- **Persistence & Toast Notifications**: LocalStorage persistence for cart, wishlist, auth state, and orders. Animated toast alerts for all user interactions.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (version 18 or higher) installed on your system.

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Development Mode
Run the development server locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
To create an optimized production build:
```bash
npm run build
```
The output files will be generated in the `dist` directory.

---

## 🌐 Deployment Instructions

### Deploying to Vercel

1. **Push to GitHub**: Commit and push your code to a GitHub repository.
2. **Import to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New** > **Project**.
   - Select your GitHub repository.
3. **Configure Settings**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy**. Vercel will automatically build and host your site with SSL.

---

### Deploying to GitHub Pages

1. **Install gh-pages** (optional helper package):
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `package.json`**:
   Add deployment scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```
   *Note: Since AuraMarket uses `HashRouter`, deep links and page refreshes work seamlessly on GitHub Pages without requiring server-side redirect rules.*

---

## 📁 Folder Structure

```
├── public/
├── src/
│   ├── components/
│   │   ├── common/        # Header, Footer, Toast, CountdownTimer, ProductCard, QuickViewModal
│   │   └── home/          # HeroSlider, FlashSalesSection, CategoryGrid, FeaturedBrands, CustomerReviews, NewsletterSection
│   ├── context/           # ShopContext (Cart, Wishlist, Auth, Orders, Toasts, Filters)
│   ├── data/              # Categories & Products rich datasets
│   ├── pages/             # Home, Shop, Categories, ProductDetails, Cart, Wishlist, Checkout, OrderSuccess, About, Contact, Login, Register, Profile, Orders, NotFound
│   ├── types/             # TypeScript interfaces and type declarations
│   ├── App.tsx            # Main router & provider wrapper
│   ├── index.css          # Global CSS & Tailwind imports
│   └── main.tsx           # Entry point
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (`motion`)
- **Icons**: Lucide React
- **Routing**: React Router (`react-router-dom`)
