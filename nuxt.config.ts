// Normal 

// export default defineNuxtConfig({
//   compatibilityDate: '2025-07-15',
//   devtools: { enabled: true },

//   modules: [
//     '@pinia/nuxt',
//     '@nuxtjs/tailwindcss'
//   ]
// })

// STEP 1 — Global SEO (very important)

// export default defineNuxtConfig({
//   compatibilityDate: '2025-07-15',

//   app: {
//     head: {
//       title: "ProjectFlow",
//       meta: [
//         {
//           name: "description",
//           content: "ProjectFlow project and task management system"
//         },

//         {
//           name: "viewport",
//           content: "width=device-width, initial-scale=1"
//         },

//         {
//           property: "og:site_name",
//           content: "ProjectFlow"
//         },

//         {
//           property: "og:type",
//           content: "website"
//         },

//         {
//           name: "twitter:card",
//           content: "summary_large_image"
//         }
//       ]
//     }
//   },

//   modules: [
//     '@pinia/nuxt',
//     '@nuxtjs/tailwindcss'
//   ]
// })

// title → site name
// description → Google search text
// viewport → mobile responsiveness
// og tags → social media preview
// twitter card → Twitter preview style

// #########
// sitemap

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  app: {
    head: {
      title: "ProjectFlow",
      meta: [
        { name: "description", content: "ProjectFlow project and task management system" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:site_name", content: "ProjectFlow" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" }
      ]
    }
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    siteUrl: 'http://localhost:3000'
  } as any
})

// http://localhost:3000/sitemap.xml