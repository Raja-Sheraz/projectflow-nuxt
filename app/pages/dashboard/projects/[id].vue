<script setup lang="ts">

// useSeo({
//   title: "Project Tasks",
//   description: "Track and manage tasks in your project.",
// })


import { ref, computed, onMounted } from "vue"
import { useRoute } from "#app"
import draggable from "vuedraggable"

import { useTaskStore } from "~~/stores/taskStore"
import { useAuthStore } from "~~/stores/authStore"

import BaseModal from "~/components/BaseModal.vue"
import EmptyState from "~/components/EmptyState.vue"

const Draggable = draggable

definePageMeta({
  layout: "dashboard",
  middleware: "auth"
})

const route = useRoute()
const projectId = Number(route.params.id)

/* SEO   dynamic Meta Seo  */ 
useSeo({
  title: `Project ${projectId} Tasks`,
  description: "Track and manage tasks in this project.",
  path: `/dashboard/projects/${projectId}`,
  noIndex: true
})

const taskStore = useTaskStore()
const authStore = useAuthStore()

const isAdmin = computed(() => authStore.user?.role === "admin")

const showModal = ref(false)

const title = ref("")
const description = ref("")
const assignedTo = ref("")
const isSubmitting = ref(false)

const users = ref<any[]>([])

onMounted(async () => {

  await taskStore.fetchTasks(projectId)

  const savedUsers = localStorage.getItem("users")

  if(savedUsers){
    users.value = JSON.parse(savedUsers)
  }

})

function resetForm(){
  title.value=""
  description.value=""
  assignedTo.value=""
  showModal.value=false
}

async function addTask(){

  if(isSubmitting.value) return

  if(!title.value.trim()){
    alert("Task title required")
    return
  }

  if(!description.value.trim()){
    alert("Description required")
    return
  }

  if(!assignedTo.value){
    alert("Please assign user")
    return
  }

  try{

    isSubmitting.value=true

    await taskStore.addTask(
      projectId,
      title.value,
      description.value,
      assignedTo.value
    )

    resetForm()

  }finally{

    isSubmitting.value=false

  }

}

/* Columns */

const todoTasks = computed(() =>
  taskStore.tasks.filter(t => t.status === "todo")
)

const progressTasks = computed(() =>
  taskStore.tasks.filter(t => t.status === "progress")
)

const doneTasks = computed(() =>
  taskStore.tasks.filter(t => t.status === "done")
)

/* Drag status update */

function updateStatus(list:any[],status:"todo"|"progress"|"done"){

  list.forEach(task=>{
    if(task.status!==status){
      taskStore.updateStatus(task.id,status)
    }
  })

}

/* Manual buttons */

function moveTask(id:number,status:"todo"|"progress"|"done"){
  taskStore.updateStatus(id,status)
}

</script>


<template>

<div class="space-y-6">

<div class="flex justify-between items-center">

<h1 class="text-2xl font-semibold">
Tasks Board
</h1>

<button
v-if="isAdmin"
@click="showModal=true"
class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>
Add Task
</button>

</div>


<div v-if="taskStore.tasks.length===0">
<EmptyState message="No tasks yet"/>
</div>


<div v-else class="grid grid-cols-3 gap-6">

<!-- TODO COLUMN -->

<div class="bg-gray-50 p-4 rounded-lg border min-h-[350px]">

<h2 class="font-semibold mb-4 text-gray-700">
Todo
</h2>

<Draggable
:list="todoTasks"
group="tasks"
item-key="id"
animation="200"
ghost-class="ghost-card"
chosen-class="dragging-card"
drag-class="drag-active"
class="space-y-3"
@change="updateStatus(todoTasks,'todo')"
>

<template #item="{element}">

<div class="task-card bg-white p-4 rounded-lg shadow-sm">

<div class="flex justify-between">

<p class="font-semibold">
{{ element.title }}
</p>

<span class="text-gray-300 cursor-grab">⋮⋮</span>

</div>

<p class="text-sm text-gray-500">
{{ element.description }}
</p>

<p class="text-xs text-gray-400 mt-1">
Assigned: {{ element.assignedTo || "Unassigned" }}
</p>

<div class="flex gap-3 mt-3 text-sm">

<button
@click="moveTask(element.id,'progress')"
class="text-blue-500 hover:underline"
>
Start
</button>

<button
v-if="isAdmin"
@click="taskStore.deleteTask(element.id)"
class="text-red-500 hover:underline"
>
Delete
</button>

</div>

</div>

</template>

</Draggable>

</div>


<!-- PROGRESS COLUMN -->

<div class="bg-gray-50 p-4 rounded-lg border min-h-[350px]">

<h2 class="font-semibold mb-4 text-gray-700">
In Progress
</h2>

<Draggable
:list="progressTasks"
group="tasks"
item-key="id"
animation="200"
ghost-class="ghost-card"
chosen-class="dragging-card"
drag-class="drag-active"
class="space-y-3"
@change="updateStatus(progressTasks,'progress')"
>

<template #item="{element}">

<div class="task-card bg-white p-4 rounded-lg shadow-sm">

<div class="flex justify-between">

<p class="font-semibold">
{{ element.title }}
</p>

<span class="text-gray-300 cursor-grab">⋮⋮</span>

</div>

<p class="text-sm text-gray-500">
{{ element.description }}
</p>

<p class="text-xs text-gray-400 mt-1">
Assigned: {{ element.assignedTo || "Unassigned" }}
</p>

<div class="flex gap-3 mt-3 text-sm">

<button
@click="moveTask(element.id,'done')"
class="text-green-600 hover:underline"
>
Complete
</button>

<button
@click="moveTask(element.id,'todo')"
class="text-blue-500 hover:underline"
>
Move Back
</button>

<button
v-if="isAdmin"
@click="taskStore.deleteTask(element.id)"
class="text-red-500 hover:underline"
>
Delete
</button>

</div>

</div>

</template>

</Draggable>

</div>


<!-- DONE COLUMN -->

<div class="bg-gray-50 p-4 rounded-lg border min-h-[350px]">

<h2 class="font-semibold mb-4 text-gray-700">
Done
</h2>

<Draggable
:list="doneTasks"
group="tasks"
item-key="id"
animation="200"
ghost-class="ghost-card"
chosen-class="dragging-card"
drag-class="drag-active"
class="space-y-3"
@change="updateStatus(doneTasks,'done')"
>

<template #item="{element}">

<div class="task-card bg-white p-4 rounded-lg shadow-sm">

<div class="flex justify-between">

<p class="font-semibold">
{{ element.title }}
</p>

<span class="text-gray-300 cursor-grab">⋮⋮</span>

</div>

<p class="text-sm text-gray-500">
{{ element.description }}
</p>

<p class="text-xs text-gray-400 mt-1">
Assigned: {{ element.assignedTo || "Unassigned" }}
</p>

<div class="flex gap-3 mt-3 text-sm">

<button
@click="moveTask(element.id,'progress')"
class="text-blue-500 hover:underline"
>
Reopen
</button>

<button
v-if="isAdmin"
@click="taskStore.deleteTask(element.id)"
class="text-red-500 hover:underline"
>
Delete
</button>

</div>

</div>

</template>

</Draggable>

</div>

</div>


<BaseModal v-model="showModal">

<template #header>
<h2 class="text-xl font-semibold">
Add Task
</h2>
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


<style scoped>

.task-card{
transition:all .2s ease;
cursor:grab;
}

.task-card:hover{
transform:translateY(-2px);
box-shadow:0 10px 18px rgba(0,0,0,.08);
}

.dragging-card{
opacity:.6;
transform:rotate(2deg);
}

.ghost-card{
opacity:.3;
background:#e0f2fe;
border:2px dashed #3b82f6;
}

.drag-active{
cursor:grabbing;
}

</style>
```
