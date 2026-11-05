# 🔥 FLAME & FUEL

<p align="center">
  <strong>A bold, cinematic restaurant experience built on fire, craft, and motion.</strong>
  <br />
  <em>Handcrafted smash burgers seared on cast iron. Fresh cuts daily. Est. 2026.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/GSAP-3_ScrollTrigger-88CE02?style=for-the-badge&logo=greensock&logoColor=black" alt="GSAP" />
  <img src="https://img.shields.io/badge/Lenis-Smooth_Scroll-f45b25?style=for-the-badge" alt="Lenis" />
</p>

---

## Overview

**FLAME & FUEL** is an editorial, dark-cinematic landing page crafted for a premier burger brand. It pairs high-impact food photography, razor-sharp typography, and smooth interactive physics with GSAP ScrollTrigger timelines and hardware-accelerated Lenis smooth scrolling.

Designed with meticulous attention to brand aesthetics, user feel, and responsive fluidity across desktop, tablet, and mobile displays.

---

## Key Features & Highlights

- **Cinematic Visual Identity**: Deep carbon `#10100e` palette punctuated by signature `#f45b25` flame-orange accents, sharp Space Grotesk editorial typography, and DM Sans readability.
- **Exploding Burger Showcase**: Viewport-adaptive 8-layer interactive anatomy breakdown pinned on scroll with dynamic ingredient separation physics.
- **Curated Menu Experience**: Category filtering (`ALL`, `CHICKEN`, `VEG`) showcasing 8 signature burgers with detailed nutritional modals, ingredient breakdown, and spiciness badges.
- **Sticky Glassmorphic Navigation**: Ultra-clean header with 16px backdrop blur, subtle border contrast, and smooth glide anchors (`duration: 1.4s`) with automatic navbar offset calculation.
- **Signature Interactive Elements**:
  - Floating circular animated "GET HUNGRY" hero portal button with SVG rotating orbital text.
  - Custom flame-orange illuminated scrollbar with glowing active and hover states.
  - Zero-latency scroll progress pill tracking page position in real-time.
  - Animated marquee banner running continuous brand mantras.
- **Production Asset Isolation**: 100% self-contained local high-resolution assets in `public/images/` with fallback error handlers.
- **Accessible & Performance-Minded**: Full `prefers-reduced-motion` compliance, GPU transform acceleration (`scaleX`, `translate3d`), and zero remote CDN runtime dependencies.

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component architecture, state management & hooks |
| **Vite 6** | Instant HMR development server and optimized rollup bundling |
| **Tailwind CSS v4** | Modern utility styling engine with custom typography tokens |
| **GSAP 3 + ScrollTrigger** | Pinning, timeline choreography, and scroll-linked reveals |
| **@studio-freight/lenis** | Smooth momentum-based inertial scrolling |
| **Lucide React** | Crisp, lightweight SVG interface icons |

---

## Project Structure

```text
Burger/
├── public/
│   ├── favicon.svg             # Custom flame vector brand favicon
│   └── images/
│       ├── hero/               # Hero burger presentation photography
│       ├── burgers/            # Menu item visuals (Chicken & Veg)
│       └── story/              # Kitchen craft and process imagery
├── src/
│   ├── components/             # Reusable UI widgets
│   │   ├── BurgerLayers.jsx    # SVG exploded burger stack components
│   │   ├── SafeImage.jsx       # Fallback-aware image wrapper
│   │   └── ScrollProgressBar.jsx # Lenis-synced progress indicator
│   ├── data/                   # Structured static configuration
│   │   ├── menu.js             # Burger recipes, pricing & categories
│   │   └── restaurant.js       # Brand info, hours & official email
│   ├── sections/               # Modular landing page sections
│   │   ├── About.jsx           # Brand story & kitchen gallery
│   │   ├── Contact.jsx         # Operating hours & table reservation
│   │   ├── ExplodingBurger.jsx # Pinned interactive scroll showcase
│   │   ├── Footer.jsx          # Editorial footer with back-to-top & explore links
│   │   └── Menu.jsx            # Filterable product grid & detail modal
│   ├── App.jsx                 # App shell, hero, signature, preloader & Lenis controller
│   ├── index.css               # Global theme tokens, scrollbar & glassmorphism
│   └── main.jsx                # Application entry point
├── index.html                  # HTML5 document shell & font imports
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd Burger

# Install project dependencies
npm install
```

### 2. Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser to view the application with live hot module replacement (HMR).

### 3. Production Build

```bash
# Build optimized static assets
npm run build

# Preview production build locally
npm run preview
```

---

## Configuration & Customization

- **Menu Items & Pricing**: Edit [`src/data/menu.js`](src/data/menu.js) to add or modify burger descriptions, pricing (₹), categories, and ingredient tags.
- **Restaurant Information**: Edit [`src/data/restaurant.js`](src/data/restaurant.js) to update official email (`mehtatanish2306@gmail.com`), operating hours, and social media handles.
- **Color Theme & Scrollbar**: Customize brand variables in [`src/index.css`](src/index.css) (`--orange: #f45b25`, `--bg: #10100e`).

---