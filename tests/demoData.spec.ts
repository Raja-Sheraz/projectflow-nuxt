import { describe, expect, it } from 'vitest'
import { seedDemoData } from '../services/demoData'
import { useAuthStore } from '../stores/authStore'

const read = (key: string) => JSON.parse(localStorage.getItem(key) ?? '[]')

describe('seedDemoData', () => {
  it('adds sample projects, tasks and team members on the first visit', () => {
    seedDemoData()

    expect(read('projects')).toHaveLength(3)
    expect(read('tasks').length).toBeGreaterThan(0)
    expect(read('users').map((u: { name: string }) => u.name)).toEqual(['Admin', 'Sara Khan', 'Ali Raza'])
  })

  it('never overwrites data the visitor already created', () => {
    localStorage.setItem('projects', JSON.stringify([{ id: 1, name: 'Mine', description: '', status: 'active' }]))

    seedDemoData()

    expect(read('projects').map((p: { name: string }) => p.name)).toEqual(['Mine'])
    expect(localStorage.getItem('tasks')).toBeNull()
  })

  it('only runs once, so deleting the samples keeps them deleted', () => {
    seedDemoData()
    localStorage.setItem('projects', '[]')
    localStorage.removeItem('tasks')

    seedDemoData()

    expect(read('projects')).toHaveLength(0)
  })

  it('keeps the demo admin login working', () => {
    seedDemoData()

    expect(useAuthStore().login('admin@gmail.com', 'admin123')).toBe(true)
  })
})
