<script setup lang="ts">

defineProps<{
  loading: boolean
  text?: string
}>()

</script>

<template>

<div
v-if="loading"
class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
>

<div class="bg-white px-6 py-4 rounded shadow flex items-center gap-3">

<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>

<span class="text-sm text-gray-600">

<slot>
{{ text || "Loading..." }}
</slot>

</span>

</div>

</div>

</template>