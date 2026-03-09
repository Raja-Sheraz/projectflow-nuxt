<script setup lang="ts">

import { useUiStore } from "~~/stores/uiStore"
import AppLoader from "~/components/AppLoader.vue"

const uiStore = useUiStore()

</script>

<template>

<NuxtLayout>
  <NuxtPage />
</NuxtLayout>

<AppLoader :loading="uiStore.loading" />

</template>