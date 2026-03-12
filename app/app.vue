<script setup lang="ts">


useSchema()


import { onMounted } from "vue"
import { useAuthStore } from "~~/stores/authStore"
import { useUiStore } from "~~/stores/uiStore"
import AppLoader from "~/components/AppLoader.vue"

const authStore = useAuthStore()
const uiStore = useUiStore()

onMounted(() => {
  authStore.loadUser()
})
</script>

<template>

<AppLoader v-if="uiStore.loading" />

<NuxtLayout>
  <NuxtPage />
</NuxtLayout>

</template>