import api from './api'
import type { Project } from '../stores/projectStore'


/* Simulated API using localStorage */
export const projectService = {

  async fetchProjects(): Promise<Project[]> {
      await api.get("/projects") // demo axios call

    await new Promise(resolve => setTimeout(resolve, 500))

    const saved = localStorage.getItem('projects')
    return saved ? JSON.parse(saved) : []
  },

  async createProject(project: Project) {
    await new Promise(resolve => setTimeout(resolve, 300))

    const saved = localStorage.getItem('projects')
    const projects = saved ? JSON.parse(saved) : []

    projects.push(project)
    localStorage.setItem('projects', JSON.stringify(projects))
  },

  async updateProject(updated: Project) {
    const saved = localStorage.getItem('projects')
    const projects = saved ? JSON.parse(saved) : []

    const index = projects.findIndex((p: Project) => p.id === updated.id)

    if (index !== -1) {
      projects[index] = updated
      localStorage.setItem('projects', JSON.stringify(projects))
    }
  },

  async deleteProject(id: number) {
    const saved = localStorage.getItem('projects')
    const projects = saved ? JSON.parse(saved) : []

    const filtered = projects.filter((p: Project) => p.id !== id)

    localStorage.setItem('projects', JSON.stringify(filtered))
  }
}