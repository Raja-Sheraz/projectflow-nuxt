import { describe, expect, it } from 'vitest'
import { useProjectStore } from '../stores/projectStore'

const stored = () => JSON.parse(localStorage.getItem('projects') ?? '[]')

describe('projectStore', () => {
  it('adds an active project and persists it', async () => {
    const store = useProjectStore()

    await store.addProject('Website', 'Company website')

    expect(store.projects).toHaveLength(1)
    expect(store.projects[0]).toMatchObject({ name: 'Website', status: 'active' })
    expect(stored()).toHaveLength(1)
  })

  it('loads saved projects', async () => {
    localStorage.setItem('projects', JSON.stringify([
      { id: 1, name: 'Saved', description: 'From storage', status: 'completed' }
    ]))
    const store = useProjectStore()

    await store.fetchProjects()

    expect(store.projects.map(p => p.name)).toEqual(['Saved'])
  })

  it('updates, toggles and deletes a project', async () => {
    const store = useProjectStore()
    await store.addProject('Website', 'Company website')
    const id = store.projects[0]!.id

    await store.updateProject(id, 'Landing page', 'Marketing site')
    expect(store.projects[0]).toMatchObject({ name: 'Landing page', description: 'Marketing site' })

    await store.toggleStatus(id)
    expect(store.projects[0]!.status).toBe('completed')
    await store.toggleStatus(id)
    expect(store.projects[0]!.status).toBe('active')

    await store.deleteProject(id)
    expect(store.projects).toHaveLength(0)
    expect(stored()).toHaveLength(0)
  })
})
