# ProjectFlow – Task & Team Management System

[![CI](https://github.com/Raja-Sheraz/projectflow-nuxt/actions/workflows/ci.yml/badge.svg)](https://github.com/Raja-Sheraz/projectflow-nuxt/actions/workflows/ci.yml)
[![Deploy](https://github.com/Raja-Sheraz/projectflow-nuxt/actions/workflows/deploy.yml/badge.svg)](https://github.com/Raja-Sheraz/projectflow-nuxt/actions/workflows/deploy.yml)
![Nuxt 4](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white)
![Tested with Vitest](https://img.shields.io/badge/tested%20with-Vitest-6E9F18?logo=vitest&logoColor=white)

**▶ Live demo: [raja-sheraz.github.io/projectflow-nuxt](https://raja-sheraz.github.io/projectflow-nuxt/)**

Click **Try the demo** on the login page, or sign in with `admin@gmail.com` / `admin123`. The demo opens with sample projects and tasks, and everything you change is saved in your own browser.

ProjectFlow is a modern **task and project management application** built using **Nuxt 4 and Vue 3**.  
The goal of this project is to demonstrate a **clean frontend architecture**, dynamic UI, and **technical SEO implementation** using Nuxt.

The application allows users to create projects, manage tasks, and organize work using a **Kanban-style board**.

This project was also used to practice **SEO implementation in Nuxt**, including SSR rendering, meta tags, sitemap, canonical URLs, and structured data.

I built a project management system called ProjectFlow using Vue 3 with Composition API.
The application allows users to manage projects and tasks using a Kanban board.

It includes:

* Authentication system (login/register)
* Protected routes using Vue Router guards
* State management using Pinia
* API abstraction using Axios
* LocalStorage persistence
* Project CRUD with search, filter, and pagination
* Task management with drag-and-drop Kanban board
* Reusable components like modal, loader, and empty state
* A custom composable for debounced search
---
After completing the Vue version, I converted the project to Nuxt 4 to support SSR and SEO, where I implemented:

* SSR rendering
* Global SEO (nuxt.config)
* Reusable SEO composable
* Dynamic page SEO
* Canonical URLs
* Robots meta rules (noindex)
* Structured data (schema)
* Sitemap.xml
* robots.txt

# Application Features

• User authentication (Login / Register)  
• Project creation and management  
• Task management inside projects  
• Kanban task board (Todo → In Progress → Done)  
• Drag and drop task movement  
• Role-based UI (Admin / Member)  
• Responsive dashboard layout  
• Global loading system  
• Reusable components and composables  
• SEO optimized Nuxt application  

---

# Tech Stack

- Nuxt 4
- Vue 3 (Composition API)
- Pinia (State Management)
- Vue Router
- TailwindCSS
- Axios
- TypeScript
- Vitest (unit tests)
- GitHub Actions (CI and deployment to GitHub Pages)

---

# Installation

Clone the repository:

```bash
git clone https://github.com/Raja-Sheraz/projectflow-nuxt.git
````

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Run the unit tests and the type-check:

```bash
npm test
npm run typecheck
```

---

# Testing and CI

Unit tests use **Vitest** with jsdom and cover the Pinia stores (auth, projects, tasks), the demo data seeding and the `useDebounce` composable, including a regression test for the task data-loss bug fixed in #1.

Every push and pull request runs the [CI workflow](.github/workflows/ci.yml): `npm ci`, type-check with `vue-tsc`, unit tests and a static `nuxt generate` build.

---

# Deployment

Every push to `main` deploys the static site to **GitHub Pages** with the [deploy workflow](.github/workflows/deploy.yml). The build sets two environment variables so all SEO URLs point to the live site:

| Variable | Value |
|---|---|
| `NUXT_PUBLIC_SITE_URL` | `https://raja-sheraz.github.io` |
| `NUXT_APP_BASE_URL` | `/projectflow-nuxt/` |

Locally they default to `http://localhost:3000` and `/`.

---

# SEO Implementation

This project includes a **complete technical SEO setup** using Nuxt features.

---

## 1. Server-Side Rendering (SSR)

Nuxt renders pages on the **server**, allowing search engines to receive fully rendered HTML.

Benefits:

* Better search engine indexing
* Faster initial page load
* Improved SEO performance

---

## 2. Global SEO Configuration

Global SEO settings are configured in:

```
nuxt.config.ts
```

Includes:

* Default page title
* Default meta description
* Viewport settings
* Base OpenGraph metadata
* Twitter card metadata

---

## 3. Page-Level SEO

Each page defines its own metadata using a reusable composable.

```
composables/useSeo.ts
```

Example:

```ts
useSeo({
  title: "Login",
  description: "Login to ProjectFlow to manage projects and tasks",
  path: "/login"
})
```

This generates:

* Title tag
* Meta description
* OpenGraph tags
* Twitter tags
* Canonical URL
* Robots meta rules

---

## 4. Canonical URLs

Canonical URLs prevent duplicate content indexing.

Example:

```html
<link rel="canonical" href="https://raja-sheraz.github.io/projectflow-nuxt/login">
```

This ensures search engines know the **main version of the page**.

---

## 5. Robots Meta Rules

Private dashboard pages are excluded from indexing using:

```
noindex, nofollow
```

Applied to:

```
/dashboard
/dashboard/projects
/dashboard/projects/[id]
```

This prevents private pages from appearing in search results.

---

## 6. Structured Data (Schema.org)

Structured data is implemented using **JSON-LD**.

File:

```
composables/useSchema.ts
```

Schema type used:

```
SoftwareApplication
```

This tells search engines the website represents a **project management application**.

---

## 7. Sitemap

The project automatically generates a sitemap:

```
/sitemap.xml
```

This helps search engines discover all important pages.

Package used:

```bash
npm install @nuxtjs/sitemap
```

Configuration in:

```
nuxt.config.ts
```

---

## 8. robots.txt

`robots.txt` is generated by a server route, [server/routes/robots.txt.ts](server/routes/robots.txt.ts), and prerendered at build time, so its sitemap link always uses the deployed address:

```
User-agent: *
Allow: /

Sitemap: https://raja-sheraz.github.io/projectflow-nuxt/sitemap.xml
```

This tells crawlers where to find the sitemap.

---

# SEO Flow in the Project

Search engines process the project in this order:

```
robots.txt
     ↓
sitemap.xml
     ↓
discover pages
     ↓
open page (SSR HTML)
     ↓
read meta tags
     ↓
read canonical URL
     ↓
read schema structured data
     ↓
index allowed pages
```

---

# Project Structure

```
app/
 ├─ components/
 ├─ composables/
 │   ├─ useSeo.ts
 │   └─ useSchema.ts
 ├─ layouts/
 ├─ pages/
 ├─ services/
 ├─ stores/
 ├─ utils/
```

---

# Example SEO Composable

```ts
export const useSeo = (options: {
  title: string
  description: string
  path?: string
  noIndex?: boolean
}) => {

  const siteName = "ProjectFlow"
  const { appUrl: siteUrl } = useRuntimeConfig().public
  const url = `${siteUrl}${options.path || ""}`

  useSeoMeta({
    title: `${options.title} | ${siteName}`,
    description: options.description,

    ogTitle: `${options.title} | ${siteName}`,
    ogDescription: options.description,
    ogType: "website",
    ogUrl: url,

    twitterCard: "summary_large_image",
    twitterTitle: `${options.title} | ${siteName}`,
    twitterDescription: options.description,

    robots: options.noIndex ? "noindex,nofollow" : "index,follow"
  })

  useHead({
    link: [
      {
        rel: "canonical",
        href: url
      }
    ]
  })

}
```

---

# What This Project Demonstrates

This project demonstrates:

* Nuxt SSR architecture
* Modular frontend structure
* Reusable composables
* State management using Pinia
* SEO best practices in Nuxt
* Dynamic meta tags for pages
* Technical SEO setup
* Unit testing with Vitest
* CI and automated deployment with GitHub Actions

---

# Author

**Raja Sheraz Anwar**, Full Stack Developer

- GitHub: [github.com/Raja-Sheraz](https://github.com/Raja-Sheraz)
- LinkedIn: [linkedin.com/in/raja-sheraz-anwar-568140233](https://www.linkedin.com/in/raja-sheraz-anwar-568140233)
