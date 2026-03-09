<script setup lang="ts">
import { ref, onMounted, computed } from "vue"

import { useProjectStore } from "~~/stores/projectStore"
import { useAuthStore } from "~~/stores/authStore"
import { useDebounce } from "~/composables/useDebounce"

import BaseModal from "~/components/BaseModal.vue"
import EmptyState from "~/components/EmptyState.vue"


definePageMeta({
  layout: "dashboard",
  middleware: "auth"
})

const projectStore = useProjectStore()
const authStore = useAuthStore()
  
onMounted(async () => {
  await projectStore.fetchProjects()
})

/* Admin check */

const isAdmin = computed(() => authStore.user?.role === "admin")

/* Modal */

const showModal = ref(false)

/* Editing */

const editingId = ref<number | null>(null)

/* Form */

const name = ref("")
const description = ref("")

/* Search */

const searchQuery = ref("")
const debouncedSearch = useDebounce(() => searchQuery.value, 400)

/* Filter */

const selectedStatus = ref<"all" | "active" | "completed">("all")

/* Pagination */

const currentPage = ref(1)
const itemsPerPage = 5

function resetForm() {

  editingId.value = null
  name.value = ""
  description.value = ""
  showModal.value = false

}

/* Add / Update */

async function handleSubmit() {

  if (!name.value.trim() || !description.value.trim()) return

  if (editingId.value) {

    await projectStore.updateProject(
      editingId.value,
      name.value,
      description.value
    )

  } else {

    await projectStore.addProject(
      name.value,
      description.value
    )

  }

  resetForm()

}

/* Edit */

function startEdit(project: any) {

  editingId.value = project.id
  name.value = project.name
  description.value = project.description

  showModal.value = true

}

/* Delete */

function deleteProject(id: number) {
  projectStore.deleteProject(id)
}

/* Status change */

function markCompleted(project: any) {
  projectStore.toggleStatus(project.id)
}

/* Filter logic */

const filteredProjects = computed(() => {

  return projectStore.projects.filter(project => {

    const matchesSearch =
      project.name.toLowerCase().includes(
        debouncedSearch.value.toLowerCase()
      )

    const matchesStatus =
      selectedStatus.value === "all" ||
      project.status === selectedStatus.value

    return matchesSearch && matchesStatus

  })

})

/* Pagination */

const totalPages = computed(() =>
  Math.ceil(filteredProjects.value.length / itemsPerPage)
)

const paginatedProjects = computed(() => {

  const start = (currentPage.value - 1) * itemsPerPage

  return filteredProjects.value.slice(
    start,
    start + itemsPerPage
  )

})
</script>


<template>

<div class="max-w-6xl mx-auto space-y-6">

<!-- Header -->

<div class="flex justify-between items-center">

<h1 class="text-2xl font-semibold">
Projects
</h1>

<button
v-if="isAdmin"
@click="showModal = true"
class="bg-blue-500 text-white px-4 py-2 rounded"
>
Add Project
</button>

</div>


<!-- Search + Filter -->

<div class="flex gap-4">

<input
v-model="searchQuery"
placeholder="Search projects..."
class="border px-3 py-2 rounded w-full"
/>

<select
v-model="selectedStatus"
class="border px-3 py-2 rounded"
>
<option value="all">All</option>
<option value="active">Active</option>
<option value="completed">Completed</option>
</select>

</div>


<!-- Empty -->

<EmptyState
v-if="filteredProjects.length === 0"
message="No projects found"
/>


<!-- Project Cards -->

<div v-if="paginatedProjects.length" class="space-y-4">

<div
v-for="project in paginatedProjects"
:key="project.id"
class="bg-white border shadow p-5 rounded flex justify-between items-center"
>

<div>

<h3 class="font-semibold text-lg">
{{ project.name }}
</h3>

<p class="text-gray-500 text-sm">
{{ project.description }}
</p>

<span
class="text-xs px-2 py-1 rounded mt-2 inline-block"
:class="project.status === 'active'
? 'bg-green-100 text-green-700'
: 'bg-gray-200 text-gray-600'"
>

{{ project.status }}

</span>

</div>


<div v-if="isAdmin" class="flex gap-3 text-sm">

<button
@click="startEdit(project)"
class="text-blue-600"
>
Edit
</button>

<button
@click="markCompleted(project)"
class="text-purple-600"
>
{{ project.status === 'active'
? 'Mark Completed'
: 'Mark Active'
}}
</button>

<button
@click="deleteProject(project.id)"
class="text-red-500"
>
Delete
</button>

</div>

</div>

</div>


<!-- Pagination -->

<div
v-if="totalPages > 1"
class="flex justify-center gap-2"
>

<button
@click="currentPage--"
class="border px-3 py-1 rounded"
>
Prev
</button>

<button
v-for="page in totalPages"
:key="page"
@click="currentPage = page"
class="border px-3 py-1 rounded"
>
{{ page }}
</button>

<button
@click="currentPage++"
class="border px-3 py-1 rounded"
>
Next
</button>

</div>


<!-- Modal -->

<BaseModal v-model="showModal">

<template #header>

<h2 class="text-xl font-semibold">
{{ editingId ? "Edit Project" : "Add Project" }}
</h2>

</template>


<input
v-model="name"
placeholder="Project name"
class="border rounded px-4 py-2 w-full mb-3"
/>

<input
v-model="description"
placeholder="Description"
class="border rounded px-4 py-2 w-full mb-3"
/>


<template #footer>

<div class="flex justify-end gap-3">

<button
@click="resetForm"
class="border px-4 py-2 rounded"
>
Cancel
</button>

<button
@click="handleSubmit"
class="bg-blue-600 text-white px-4 py-2 rounded"
>
Save
</button>

</div>

</template>

</BaseModal>

</div>

</template>