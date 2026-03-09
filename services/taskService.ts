import type { Task } from '../stores/taskStore'

export const taskService = {

  async fetchTasks(): Promise<Task[]> {
    await new Promise(resolve => setTimeout(resolve, 200))

    const saved = localStorage.getItem('tasks')
    const tasks = saved ? JSON.parse(saved) : []

    return tasks
  },

  async createTask(task: Task) {
    await new Promise(resolve => setTimeout(resolve, 200))

    const saved = localStorage.getItem('tasks')
    const tasks: Task[] = saved ? JSON.parse(saved) : []

    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
  },

  async updateTask(updated: Task) {
    await new Promise(resolve => setTimeout(resolve, 200))

    const saved = localStorage.getItem('tasks')
    const tasks: Task[] = saved ? JSON.parse(saved) : []

    const index = tasks.findIndex(t => t.id === updated.id)

    if (index !== -1) {
      // 🔥 important: replace fully
      tasks[index] = {
        id: updated.id,
        projectId: updated.projectId,
        title: updated.title,
        description: updated.description,
        status: updated.status,
        assignedTo: updated.assignedTo ?? null
      }

      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  },

  async deleteTask(id: number) {
    await new Promise(resolve => setTimeout(resolve, 200))

    const saved = localStorage.getItem('tasks')
    const tasks: Task[] = saved ? JSON.parse(saved) : []

    const filtered = tasks.filter(t => t.id !== id)

    localStorage.setItem('tasks', JSON.stringify(filtered))
  }
}