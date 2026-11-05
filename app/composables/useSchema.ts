export const useSchema = () => {

  const { appUrl: siteUrl } = useRuntimeConfig().public

  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "ProjectFlow",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "description": "ProjectFlow task and project management system",
          "url": siteUrl
        })
      }
    ]
  })

}