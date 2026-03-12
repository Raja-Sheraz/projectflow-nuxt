export const useSchema = () => {

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
          "url": "http://localhost:3000"
        })
      }
    ]
  })

}