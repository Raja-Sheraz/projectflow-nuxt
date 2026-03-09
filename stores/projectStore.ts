import { defineStore } from "pinia"
import { ref } from "vue"
import { projectService } from "../services/projectService"
import { useUiStore } from "./uiStore"

export interface Project {
  id: number
  name: string
  description: string
  status: "active" | "completed"
}

export const useProjectStore = defineStore("projects", () => {

  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const uiStore = useUiStore()

  async function fetchProjects() {

    try {

      uiStore.startLoading()

      const data = await projectService.fetchProjects()

      projects.value = data

    } catch (err) {

      error.value = "Failed to load projects"

    } finally {

      uiStore.stopLoading()

    }

  }

  async function addProject(name: string, description: string) {

    try {

      uiStore.startLoading()

      const newProject: Project = {
        id: Date.now() + Math.random(),
        name,
        description,
        status: "active"
      }

      projects.value.push(newProject)

      await projectService.saveProjects(projects.value)

    } finally {

      uiStore.stopLoading()

    }

  }

  async function updateProject(id: number, name: string, description: string) {

    try {

      uiStore.startLoading()

      const project = projects.value.find(p => p.id === id)

      if (!project) return

      project.name = name
      project.description = description

      await projectService.saveProjects(projects.value)

    } finally {

      uiStore.stopLoading()

    }

  }

  async function toggleStatus(id: number) {

    try {

      uiStore.startLoading()

      const project = projects.value.find(p => p.id === id)

      if (!project) return

      project.status =
        project.status === "active"
          ? "completed"
          : "active"

      await projectService.saveProjects(projects.value)

    } finally {

      uiStore.stopLoading()

    }

  }

  async function deleteProject(id: number) {

    try {

      uiStore.startLoading()

      projects.value =
        projects.value.filter(p => p.id !== id)

      await projectService.saveProjects(projects.value)

    } finally {

      uiStore.stopLoading()

    }

  }

  return {
    projects,
    loading,
    error,
    fetchProjects,
    addProject,
    updateProject,
    toggleStatus,
    deleteProject
  }

})