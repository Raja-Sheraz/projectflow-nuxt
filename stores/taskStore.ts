import { defineStore } from "pinia"
import { ref } from "vue"

export interface Task {
  id: number
  title: string
  description: string
  status: "todo" | "progress" | "done"
  projectId: number
  assignedTo?: string
}

export const useTaskStore=defineStore("tasks",()=>{

const tasks=ref<Task[]>([])

function loadTasks(){

const data=localStorage.getItem("tasks")

if(!data) return

tasks.value=JSON.parse(data)

}

function saveTasks(){

localStorage.setItem("tasks",JSON.stringify(tasks.value))

}

async function fetchTasks(projectId:number){

loadTasks()

tasks.value=tasks.value.filter(t=>t.projectId===projectId)

}

async function addTask(
  projectId:number,
  title:string,
  description:string,
  assignedTo:string
){
    
const newTask:Task = {
  id: Date.now(),
  title,
  description,
  projectId,
  status:"todo",
  assignedTo
}

tasks.value.push(newTask)

saveTasks()

}

function updateStatus(id:number,status:"todo"|"progress"|"done"){

const task=tasks.value.find(t=>t.id===id)

if(!task) return

task.status=status

saveTasks()

}

function deleteTask(id:number){

tasks.value=tasks.value.filter(t=>t.id!==id)

saveTasks()

}

async function fetchAllTasks(){

  const saved = localStorage.getItem("tasks")

  if(saved){
    tasks.value = JSON.parse(saved)
  }

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