# 👗 Refashion

> A full-stack, production-ready fashion web application built with **Next.js**, featuring secure authentication, global state management via Context API, MongoDB cloud database, and seamless image handling with ImageKit.io.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Authentication Flow](#authentication-flow)
- [Context API Architecture](#context-api-architecture)
- [Database Schema](#database-schema)
- [Image Upload with ImageKit.io](#image-upload-with-imagekitio)
- [Deployment](#deployment)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

---

## 🧾 Overview

**Refashion** is a modern fashion platform where users can browse, upload, and manage outfit/product listings. The app is built for real-world production use — with a secure authentication system, cloud-stored images, and a persistent MongoDB backend.

---

## 🚀 Live Demo

> 🔗 [https://refashion.vercel.app](https://refashion.vercel.app) *(update with your actual URL)*

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based login/signup with hashed passwords (bcrypt), protected routes, and persistent sessions
- 🌐 **Context API** — Global state management for user sessions, cart, and UI state without Redux overhead
- 🗄️ **MongoDB Atlas** — Cloud-hosted NoSQL database for users, products, and orders
- 🖼️ **ImageKit.io** — Real-time image optimization, transformation, and CDN delivery for all uploaded images
- 📱 **Responsive Design** — Mobile-first UI that works seamlessly on all screen sizes
- ⚡ **Next.js App Router** — File-based routing with server-side rendering (SSR) and static generation (SSG)
- 🛡️ **Protected API Routes** — Middleware-secured endpoints with token validation
- 🔄 **Real-time Updates** — Instant UI refresh on state changes via Context
- 🚀 **Production Ready** — Environment-based config, error boundaries, and optimized builds

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14+](https://nextjs.org/) (App Router) |
| **Language** | JavaScript / TypeScript |
| **Authentication** | JWT + bcryptjs |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) via Mongoose |
| **Image CDN** | [ImageKit.io](https://imagekit.io/) |
| **State Management** | React Context API |
| **Styling** | Tailwind CSS |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Package Manager** | npm / yarn |

---

## 📁 Project Structure

```
refashion/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.jsx
│   │   └── signup/
│   │       └── page.jsx
│   ├── (dashboard)/
│   │   ├── profile/
│   │   └── listings/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js
│   │   │   ├── signup/route.js
│   │   │   └── logout/route.js
│   │   ├── products/
│   │   │   ├── route.js
│   │   │   └── [id]/route.js
│   │   └── imagekit/
│   │       └── auth/route.js
│   ├── layout.jsx
│   └── page.jsx
│
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   └── SignupForm.jsx
│   ├── ui/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ImageUploader.jsx
│   └── products/
│       ├── ProductCard.jsx
│       └── ProductGrid.jsx
│
├── context/
│   ├── AuthContext.jsx        ← User session & auth state
│   ├── CartContext.jsx        ← Cart items & totals
│   └── AppContext.jsx         ← Global UI state
│
├── lib/
│   ├── mongodb.js             ← MongoDB connection helper
│   ├── auth.js                ← JWT helpers (sign, verify)
│   └── imagekit.js            ← ImageKit SDK setup
│
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
│
├── middleware.js               ← Route protection
├── .env.local                  ← Environment variables (never commit)
├── next.config.js
└── README.md
```

---

## 🏁 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher
- **npm** v9+ or **yarn**
- A **MongoDB Atlas** account — [Create one free](https://www.mongodb.com/atlas)
- An **ImageKit.io** account — [Create one free](https://imagekit.io/)

---

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/refashion.git

# 2. Navigate into the project
cd refashion

# 3. Install dependencies
npm install
```

---

### Environment Variables

Create a `.env.local` file in the root of your project and add the following:

```env
# ─── App ──────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ─── MongoDB Atlas ────────────────────────────────
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/refashion?retryWrites=true&w=majority

# ─── JWT Authentication ───────────────────────────
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# ─── ImageKit.io ──────────────────────────────────
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

> ⚠️ **Never commit `.env.local` to version control.** It is already included in `.gitignore`.

---

### Running the App

```bash
# Development server
npm run dev

# Production build
npm run build
npm run start

# Lint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Authentication Flow

Refashion uses a **JWT-based stateless authentication** system:

```
User submits credentials
        │
        ▼
 POST /api/auth/login
        │
        ▼
Validate with MongoDB (bcrypt compare)
        │
        ▼
  Sign JWT (server-side)
        │
        ▼
 Set HttpOnly Cookie ──► Client browser
        │
        ▼
AuthContext reads cookie ──► Global user state
        │
        ▼
middleware.js checks token ──► Protects private routes
```

**Security measures applied:**
- Passwords hashed with **bcrypt** (salt rounds: 12)
- JWT stored in **HttpOnly cookies** (not localStorage) to prevent XSS
- **CSRF protection** via SameSite cookie policy
- **Protected API routes** validated via `middleware.js` on every request
- Tokens expire automatically after the configured duration

---

## 🌐 Context API Architecture

Three context providers wrap the app to manage global state:

```jsx
// app/layout.jsx
<AppProvider>
  <AuthProvider>
    <CartProvider>
      {children}
    </CartProvider>
  </AuthProvider>
</AppProvider>
```

| Context | Manages |
|---|---|
| `AuthContext` | Logged-in user object, login/logout functions, loading state |
| `CartContext` | Cart items, add/remove/clear, total price calculation |
| `AppContext` | Theme, modal state, notifications, global UI flags |

**Usage example:**

```jsx
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
}
```

---

## 🗄️ Database Schema

### User Model

```js
{
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },       // bcrypt hashed
  avatar:    { type: String },                       // ImageKit URL
  role:      { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now }
}
```

### Product Model

```js
{
  title:       { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  images:      [{ url: String, fileId: String }],    // ImageKit data
  category:    { type: String },
  seller:      { type: ObjectId, ref: "User" },
  createdAt:   { type: Date, default: Date.now }
}
```

---

## 🖼️ Image Upload with ImageKit.io

Images are securely uploaded via a **client → server authentication → ImageKit** flow:

```
Client selects image
       │
       ▼
GET /api/imagekit/auth   ← Server generates upload signature
       │
       ▼
ImageKit SDK uploads directly from client using signature
       │
       ▼
ImageKit returns { url, fileId }
       │
       ▼
URL saved to MongoDB Product document
```

**Key ImageKit features used:**
- **Automatic image optimization** — WebP conversion, compression
- **Transformations on-the-fly** — resize, crop, quality tuning via URL params
- **CDN delivery** — fast global image loading
- **Secure uploads** — server-generated signatures prevent unauthorized uploads

Example transformation URL:
```
https://ik.imagekit.io/your_id/product.jpg?tr=w-400,h-400,fo-auto
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Then add all environment variables from `.env.local` in your **Vercel Dashboard → Project → Settings → Environment Variables**.

### Manual Checklist Before Deploying

- [ ] All `.env` variables added to hosting platform
- [ ] MongoDB Atlas IP whitelist set to `0.0.0.0/0` (or Vercel IPs)
- [ ] `next.config.js` includes ImageKit domain in `images.domains`
- [ ] `npm run build` completes with no errors
- [ ] Auth cookies use `secure: true` and `sameSite: "strict"` in production

---

## 📡 API Routes

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | ❌ | Register a new user |
| `POST` | `/api/auth/login` | ❌ | Login and receive JWT cookie |
| `POST` | `/api/auth/logout` | ✅ | Clear auth cookie |
| `GET` | `/api/auth/me` | ✅ | Get current user details |
| `GET` | `/api/products` | ❌ | Fetch all products |
| `POST` | `/api/products` | ✅ | Create a new product listing |
| `GET` | `/api/products/[id]` | ❌ | Fetch a single product |
| `PUT` | `/api/products/[id]` | ✅ | Update a product |
| `DELETE` | `/api/products/[id]` | ✅ | Delete a product |
| `GET` | `/api/imagekit/auth` | ✅ | Get ImageKit upload signature |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

```bash
# 1. Fork the repo
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "feat: add your feature description"

# 4. Push to your fork
git push origin feature/your-feature-name

# 5. Open a Pull Request
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ using **Next.js**, **MongoDB**, and **ImageKit.io**

⭐ Star this repo if you found it helpful!

</div>