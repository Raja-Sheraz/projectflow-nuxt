<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useRoute } from "#app"
import { useTaskStore } from "~~/stores/taskStore"
import { useAuthStore } from "~~/stores/authStore"

const authStore = useAuthStore()

const isAdmin = computed(() => authStore.user?.role === "admin")

import BaseModal from "~/components/BaseModal.vue"
import EmptyState from "~/components/EmptyState.vue"

definePageMeta({
  layout: "dashboard",
  middleware: "auth"
})

const route = useRoute()
const projectId = Number(route.params.id)

const taskStore = useTaskStore()

onMounted(async () => {
  await taskStore.fetchTasks(projectId)
})

const showModal = ref(false)

const title = ref("")
const description = ref("")
const assignedTo = ref("")

function resetForm() {
  title.value = ""
  description.value = ""
  assignedTo.value = ""
  showModal.value = false
}

const isSubmitting = ref(false)

async function addTask() {

  if (isSubmitting.value) return

if (!title.value.trim()) {
  alert("Task title required")
  return
}

if (!description.value.trim()) {
  alert("Description required")
  return
}

if (!assignedTo.value) {
  alert("Please assign a user")
  return
}

  try {

    isSubmitting.value = true

    await taskStore.addTask(
      projectId,
      title.value,
      description.value,
      assignedTo.value
    )

    resetForm()

  } finally {

    isSubmitting.value = false

  }

}

const todoTasks = computed(() =>
  taskStore.tasks.filter(t => t.status === "todo")
)

const progressTasks = computed(() =>
  taskStore.tasks.filter(t => t.status === "progress")
)

const doneTasks = computed(() =>
  taskStore.tasks.filter(t => t.status === "done")
)


const users = ref<any[]>([])

onMounted(async () => {

  await taskStore.fetchTasks(projectId)

  const savedUsers = localStorage.getItem("users")

  if(savedUsers){
    users.value = JSON.parse(savedUsers)
  }

})



function moveTask(id:number,status:"todo"|"progress"|"done"){
  taskStore.updateStatus(id,status)
}


</script>

<template>

<div class="space-y-6">

<div class="flex justify-between items-center">
<h1 class="text-2xl font-semibold">Tasks Board</h1>

<button
v-if="isAdmin"
@click="showModal = true"
class="bg-blue-600 text-white px-4 py-2 rounded"
>
Add Task
</button>

</div>


<div v-if="taskStore.tasks.length === 0">
<EmptyState message="No tasks yet"/>
</div>


<div v-else class="grid grid-cols-3 gap-6">

<!-- TODO -->

<div class="bg-gray-100 p-4 rounded">

<h2 class="font-semibold mb-4">Todo</h2>

<div
v-for="task in todoTasks"
:key="task.id"
class="bg-white p-3 rounded shadow mb-3"
>

<p class="font-medium">{{ task.title }} <hr> </p>

<p class="text-sm text-gray-500">
{{ task.description }}
</p>

<hr>
<p class="text-xs text-gray-400">
Assigned: {{ task.assignedTo || "Unassigned" }}
</p>
<br>
<hr>
<div class="flex gap-2 mt-2 text-sm">

<button
@click="moveTask(task.id,'progress')"
class="text-blue-500"
>
Start Progress
</button>

<button
v-if="isAdmin"
@click="taskStore.deleteTask(task.id)"
class="text-red-500"
>
Delete
</button>

</div>

</div>

</div>


<!-- IN PROGRESS -->

<div class="bg-gray-100 p-4 rounded">

<h2 class="font-semibold mb-4">In Progress</h2>

<div
v-for="task in progressTasks"
:key="task.id"
class="bg-white p-3 rounded shadow mb-3"
>

<p class="font-medium">{{ task.title }}  <hr></p>

<p class="text-sm text-gray-500">
{{ task.description  }}
</p>
<hr>

<p class="text-xs text-gray-400">
Assigned: {{ task.assignedTo || "Unassigned" }}
</p>
<br>
<hr>
<div class="flex gap-2 mt-2 text-sm">

<button
@click="moveTask(task.id,'done')"
class="text-green-600"
>
Mark as Complete
</button>
<button
@click="moveTask(task.id,'todo')"
class="text-blue-500"
>
|&ensp;
Move Start
</button>


<button
v-if="isAdmin"
@click="taskStore.deleteTask(task.id)"
class="text-red-500"
>
|&ensp;
Delete
</button>

</div>

</div>

</div>


<!-- DONE -->

<div class="bg-gray-100 p-4 rounded">

<h2 class="font-semibold mb-4">Done</h2>

<div
v-for="task in doneTasks"
:key="task.id"
class="bg-white p-3 rounded shadow mb-3"
>

<p class="font-medium">{{ task.title }}  <hr></p>

<p class="text-sm text-gray-500">
{{ task.description }}
</p>

 <hr>
<p class="text-xs text-gray-400">
Assigned: {{ task.assignedTo || "Unassigned" }}
</p>

<br>
<hr>

<button
v-if="isAdmin"
@click="taskStore.deleteTask(task.id)"
class="text-red-500 text-sm mt-2"
>
Delete
</button>

</div>

</div>

</div>


<BaseModal v-model="showModal">

<template #header>
<h2 class="text-xl font-semibold">Add Task</h2>
</template>

<input
v-model="title"
placeholder="Task title"
class="border px-4 py-2 rounded w-full mb-3"
/>

<input
v-model="description"
placeholder="Task description"
class="border px-4 py-2 rounded w-full mb-3"
/>

<select
v-model="assignedTo"
class="border px-4 py-2 rounded w-full mb-3"
>
<option value="">Select user</option>

<option
v-for="user in users"
:key="user.id"
:value="user.name"
>
{{ user.name }}
</option>

</select>

<template #footer>

<div class="flex justify-end gap-3">

<button
@click="resetForm"
class="border px-4 py-2 rounded"
>
Cancel
</button>



<button
@click="addTask"
:disabled="isSubmitting"
class="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
>
{{ isSubmitting ? "Creating..." : "Create" }}
</button>

</div>

</template>

</BaseModal>

</div>

</template>