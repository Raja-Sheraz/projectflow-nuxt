import type { Project } from '../stores/projectStore'
import type { Task } from '../stores/taskStore'

const SEEDED_KEY = 'demoSeeded'

const demoUsers = [
  { id: 1, name: 'Admin', email: 'admin@gmail.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Sara Khan', email: 'sara@projectflow.dev', password: 'demo123', role: 'member' },
  { id: 3, name: 'Ali Raza', email: 'ali@projectflow.dev', password: 'demo123', role: 'member' }
]

const demoProjects: Project[] = [
  { id: 101, name: 'Company Website Redesign', description: 'New marketing site with a faster homepage and better SEO.', status: 'active' },
  { id: 102, name: 'Mobile App Launch', description: 'Ship the first release of the iOS and Android app.', status: 'active' },
  { id: 103, name: 'Q3 Analytics Dashboard', description: 'Sales and usage reports for the leadership team.', status: 'completed' }
]

const demoTasks: Task[] = [
  { id: 1001, projectId: 101, title: 'Design new homepage', description: 'Hero, features and pricing sections from the Figma file.', status: 'done', assignedTo: 'Admin' },
  { id: 1002, projectId: 101, title: 'Set up SEO meta tags and sitemap', description: 'Canonical URLs, Open Graph tags and sitemap.xml.', status: 'progress', assignedTo: 'Sara Khan' },
  { id: 1003, projectId: 101, title: 'Optimize hero images', description: 'Serve WebP and preload the main image.', status: 'todo', assignedTo: 'Ali Raza' },
  { id: 1004, projectId: 101, title: 'Write landing page copy', description: 'Headline, value points and call to action.', status: 'todo', assignedTo: 'Sara Khan' },
  { id: 1005, projectId: 102, title: 'Build login and registration screens', description: 'Email sign-in with form validation.', status: 'done', assignedTo: 'Ali Raza' },
  { id: 1006, projectId: 102, title: 'Integrate push notifications', description: 'Notify users when a task is assigned to them.', status: 'progress', assignedTo: 'Admin' },
  { id: 1007, projectId: 102, title: 'App store listing and screenshots', description: 'Descriptions and screenshots for both stores.', status: 'todo', assignedTo: 'Sara Khan' },
  { id: 1008, projectId: 103, title: 'Connect sales data source', description: 'Nightly import from the sales database.', status: 'done', assignedTo: 'Admin' },
  { id: 1009, projectId: 103, title: 'Build revenue chart', description: 'Monthly revenue with a year-over-year comparison.', status: 'done', assignedTo: 'Ali Raza' }
]

/**
 * Fills localStorage with sample projects, tasks and team members the first time
 * someone opens the app, so the dashboard and Kanban board are not empty.
 * Never overwrites data the visitor has already created, and only runs once.
 */
export function seedDemoData() {
  if (localStorage.getItem(SEEDED_KEY)) return

  if (!localStorage.getItem('projects') && !localStorage.getItem('tasks')) {
    const existingUsers = JSON.parse(localStorage.getItem('users') ?? '[]') as { email: string }[]
    const newUsers = demoUsers.filter(d => !existingUsers.some(u => u.email === d.email))

    localStorage.setItem('users', JSON.stringify([...existingUsers, ...newUsers]))
    localStorage.setItem('projects', JSON.stringify(demoProjects))
    localStorage.setItem('tasks', JSON.stringify(demoTasks))
  }

  localStorage.setItem(SEEDED_KEY, '1')
}
