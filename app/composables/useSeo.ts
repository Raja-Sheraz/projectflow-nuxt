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