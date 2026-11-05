import { describe, expect, it } from 'vitest'
import { useTaskStore, type Task } from '../stores/taskStore'

const seed = (tasks: Task[]) => localStorage.setItem('tasks', JSON.stringify(tasks))
const stored = (): Task[] => JSON.parse(localStorage.getItem('tasks') ?? '[]')

const taskA: Task = { id: 1, title: 'Design UI', description: 'Dashboard', status: 'todo', projectId: 10 }
const taskB: Task = { id: 2, title: 'Build API', description: 'Endpoints', status: 'progress', projectId: 20 }

describe('taskStore', () => {
  it('shows only the open project\'s tasks', async () => {
    seed([taskA, taskB])
    const store = useTaskStore()

    await store.fetchTasks(10)

    expect(store.tasks.map(t => t.id)).toEqual([1])
  })

  it('shows every task on the dashboard', async () => {
    seed([taskA, taskB])
    const store = useTaskStore()

    await store.fetchAllTasks()

    expect(store.tasks).toHaveLength(2)
  })

  // Regression test for #1: changing one project used to wipe the others from storage
  it('keeps other projects\' tasks when adding, moving or deleting a task', async () => {
    seed([taskA, taskB])
    const store = useTaskStore()
    await store.fetchTasks(10)

    await store.addTask(10, 'Write tests', 'Vitest', 'Admin')
    store.updateStatus(1, 'done')
    store.deleteTask(1)

    const saved = stored()
    expect(saved.find(t => t.id === 2)).toMatchObject({ projectId: 20, status: 'progress' })
    expect(saved.filter(t => t.projectId === 10).map(t => t.title)).toEqual(['Write tests'])
  })

  it('creates new tasks in the To do column', async () => {
    const store = useTaskStore()
    await store.fetchTasks(10)

    await store.addTask(10, 'Write tests', 'Vitest', 'Admin')

    expect(store.tasks[0]).toMatchObject({ title: 'Write tests', status: 'todo', assignedTo: 'Admin' })
  })
})
