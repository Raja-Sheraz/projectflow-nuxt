<script setup lang="ts">
defineProps<{
  loading: boolean
}>()
</script>

<template>

<div
v-if="loading"
class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
>

<div class="bg-white px-6 py-4 rounded shadow">
Loading...
</div>

</div>

</template>