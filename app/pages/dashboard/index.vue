<script setup lang="ts">
import { computed, onMounted } from "vue"
import { useProjectStore } from "~~/stores/projectStore"

definePageMeta({
  layout: "dashboard",
  middleware: "auth"
})

const projectStore = useProjectStore()

onMounted(async () => {
  await projectStore.fetchProjects()
})

const totalProjects = computed(() =>
  projectStore.projects.length
)

const activeProjects = computed(() =>
  projectStore.projects.filter(p => p.status === "active").length
)

const completedProjects = computed(() =>
  projectStore.projects.filter(p => p.status === "completed").length
)
</script>

<template>

<div class="grid grid-cols-3 gap-6">

<div class="bg-white shadow p-6 rounded">
<h2>Total Projects</h2>
<p class="text-3xl mt-2">
{{ totalProjects }}
</p>
</div>

<div class="bg-white shadow p-6 rounded">
<h2>Active Projects</h2>
<p class="text-3xl mt-2 text-green-600">
{{ activeProjects }}
</p>
</div>

<div class="bg-white shadow p-6 rounded">
<h2>Completed Projects</h2>
<p class="text-3xl mt-2 text-gray-600">
{{ completedProjects }}
</p>
</div>

</div>

</template>