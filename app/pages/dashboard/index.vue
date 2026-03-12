<script setup lang="ts">

useSeo({
  title: "Dashboard",
  description: "Overview of projects and tasks in ProjectFlow.",
  path: "/dashboard",
  noIndex: true
})


import { computed, onMounted } from "vue"
import { useProjectStore } from "~~/stores/projectStore"
import { useTaskStore } from "~~/stores/taskStore"



definePageMeta({
  layout: "dashboard",
  middleware: "auth"
})

const projectStore = useProjectStore()
const taskStore = useTaskStore()



// Bad for seo
onMounted(async () => {

  await projectStore.fetchProjects()
  await taskStore.fetchAllTasks()

})

// For SEO but this work for real database or api not woth local storage
// await useAsyncData("dashboard-data", async () => {

//   await projectStore.fetchProjects()
//   await taskStore.fetchAllTasks()

// })




// Seo with local storage with fake api

// const { data: projects } = await useAsyncData("projects", () =>
//   $fetch("/api/projects")
// )

// const totalProjects = computed(() => projects.value?.length || 0)

// const activeProjects = computed(() =>
//   projects.value?.filter(p => p.status === "active").length || 0
// )

// const completedProjects = computed(() =>
//   projects.value?.filter(p => p.status === "completed").length || 0
// )




// // old without seo measn localstorage fetch from projectstore

const totalProjects = computed(() =>
  projectStore.projects.length
)

const activeProjects = computed(() =>
  projectStore.projects.filter(p => p.status === "active").length
)

const completedProjects = computed(() =>
  projectStore.projects.filter(p => p.status === "completed").length
)



// Now for task fake api for seo

// const { data: tasks } = await useAsyncData("tasks", () =>
//   $fetch("/api/tasks")
// )

// const todoTasks = computed(() =>
//   tasks.value?.filter(t => t.status === "todo").length || 0
// )

// const progressTasks = computed(() =>
//   tasks.value?.filter(t => t.status === "progress").length || 0
// )

// const doneTasks = computed(() =>
//   tasks.value?.filter(t => t.status === "done").length || 0
// )


// // old taskstore with taskstore

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