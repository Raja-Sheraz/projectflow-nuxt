# ProjectFlow – Task & Team Management System

ProjectFlow is a modern **task and project management application** built using **Nuxt 4 and Vue 3**.  
The goal of this project is to demonstrate a **clean frontend architecture**, dynamic UI, and **technical SEO implementation** using Nuxt.

The application allows users to create projects, manage tasks, and organize work using a **Kanban-style board**.

This project was also used to practice **SEO implementation in Nuxt**, including SSR rendering, meta tags, sitemap, canonical URLs, and structured data.

---

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

---

# Installation

Clone the repository:

```bash
git clone https://github.com/your-username/projectflow-nuxt.git
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
<link rel="canonical" href="http://localhost:3000/dashboard/projects/1">
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

Crawler rules are defined in:

```
public/robots.txt
```

Example:

```
User-agent: *
Allow: /

Sitemap: http://localhost:3000/sitemap.xml
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
  const url = `http://localhost:3000${options.path || ""}`

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

---

# Author

Raja Sheraz Anwar
Frontend Developer

GitHub:
[https://github.com/Raja-Sheraz](https://github.com/Raja-Sheraz)

```

---
