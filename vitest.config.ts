import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    {
      // Nuxt replaces `import.meta.client` / `import.meta.server` at build time; do the same for tests
      name: 'nuxt-import-meta-flags',
      transform(code, id) {
        if (id.includes('node_modules') || !code.includes('import.meta.')) return
        return code
          .replace(/import\.meta\.client/g, 'true')
          .replace(/import\.meta\.server/g, 'false')
      }
    }
  ],
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.spec.ts'],
    setupFiles: ['tests/setup.ts']
  }
})
