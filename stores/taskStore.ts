import { defineStore } from "pinia"
import { computed, ref } from "vue"

export interface Task {
  id: number
  title: string
  description: string
  status: "todo" | "progress" | "done"
  projectId: number
  assignedTo?: string
}

export const useTaskStore = defineStore("tasks", () => {

  /* Every task across all projects. Always save this list, never a filtered view. */
  const allTasks = ref<Task[]>([])

  /* The project currently on screen, or null for the dashboard (all projects) */
  const currentProjectId = ref<number | null>(null)

  const tasks = computed(() =>
    currentProjectId.value === null
      ? allTasks.value
      : allTasks.value.filter(t => t.projectId === currentProjectId.value)
  )

  function loadTasks() {
    const data = localStorage.getItem("tasks")
    allTasks.value = data ? JSON.parse(data) : []
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(allTasks.value))
  }

  async function fetchTasks(projectId: number) {
    loadTasks()
    currentProjectId.value = projectId
  }

  async function fetchAllTasks() {
    loadTasks()
    currentProjectId.value = null
  }

  async function addTask(
    projectId: number,
    title: string,
    description: string,
    assignedTo: string
  ) {
    allTasks.value.push({
      id: Date.now(),
      title,
      description,
      projectId,
      status: "todo",
      assignedTo
    })

    saveTasks()
  }

  function updateStatus(id: number, status: "todo" | "progress" | "done") {
    const task = allTasks.value.find(t => t.id === id)

    if (!task) return

    task.status = status

    saveTasks()
  }

  function deleteTask(id: number) {
    allTasks.value = allTasks.value.filter(t => t.id !== id)

    saveTasks()
  }

  return {
    tasks,
    fetchTasks,
    fetchAllTasks,
    addTask,
    deleteTask,
    updateStatus
  }

})
