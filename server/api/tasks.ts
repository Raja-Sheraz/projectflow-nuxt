export default defineEventHandler(() => {
  return [
    {
      id: 1,
      title: "Design UI",
      description: "Create dashboard UI",
      status: "done",
      projectId: 1,
      assignedTo: "Admin"
    },
    {
      id: 2,
      title: "Build API",
      description: "Create backend endpoints",
      status: "progress",
      projectId: 1,
      assignedTo: "Admin"
    }
  ]
})