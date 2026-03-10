<script setup lang="ts">
import { onMounted } from "vue"
import { useAuthStore } from "~~/stores/authStore"

const authStore = useAuthStore()

onMounted(() => {
  authStore.loadUser()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>