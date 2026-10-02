import { seedDemoData } from '~~/services/demoData'

// Runs before the app mounts, so pages that load data on mount already see the sample data
export default defineNuxtPlugin(() => {
  seedDemoData()
})
