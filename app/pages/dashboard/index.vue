<script setup lang="ts">
import { computed, onMounted } from "vue"
import { useProjectStore } from "~~/stores/projectStore"
import { useTaskStore } from "~~/stores/taskStore"

definePageMeta({
  layout: "dashboard",
  middleware: "auth"
})

const projectStore = useProjectStore()
const taskStore = useTaskStore()

onMounted(async () => {

  await projectStore.fetchProjects()
  await taskStore.fetchAllTasks()

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

const todoTasks = computed(() =>
  taskStore.tasks.filter(t => t.status === "todo").length
)

const progressTasks = computed(() =>
  taskStore.tasks.filter(t => t.status === "progress").length
)

const doneTasks = computed(() =>
  taskStore.tasks.filter(t => t.status === "done").length
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

<div class="bg-white shadow p-6 rounded">
<h2>Todo Tasks</h2>
<p class="text-3xl mt-2">
{{ todoTasks }}
</p>
</div>

<div class="bg-white shadow p-6 rounded">
<h2>In Progress Tasks</h2>
<p class="text-3xl mt-2 text-blue-600">
{{ progressTasks }}
</p>
</div>

<div class="bg-white shadow p-6 rounded">
<h2>Completed Tasks</h2>
<p class="text-3xl mt-2 text-gray-600">
{{ doneTasks }}
</p>
</div>

</div>

</template>