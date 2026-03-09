import api from "./api"

export const projectService = {

  async fetchProjects() {

    await new Promise(resolve => setTimeout(resolve, 500))

    const data = localStorage.getItem("projects")

    if (!data) return []

    return JSON.parse(data)

  },

  async saveProjects(projects: any[]) {

    await new Promise(resolve => setTimeout(resolve, 300))

    localStorage.setItem("projects", JSON.stringify(projects))

  }

}