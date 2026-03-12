<script setup lang="ts">

useSeo({
  title: "Register",
  description: "Create your ProjectFlow account.",
  path: "/register"
})

import { ref } from "vue"
import { useAuthStore } from "~~/stores/authStore"

const authStore = useAuthStore()

const router = useRouter()

const name = ref("")
const email = ref("")
const password = ref("")

function handleRegister() {

  if (!name.value || !email.value || !password.value) {
    alert("All fields required")
    return
  }

  authStore.register(
    name.value,
    email.value,
    password.value
  )

  router.push("/login")

}

</script>


<template>

<div class="min-h-screen flex items-center justify-center bg-gray-100">

<div class="bg-white p-8 rounded shadow w-96 space-y-4">

<h2 class="text-xl font-semibold text-center">
Register
</h2>

<input
v-model="name"
placeholder="Name"
class="border w-full px-3 py-2 rounded"
/>

<input
v-model="email"
placeholder="Email"
class="border w-full px-3 py-2 rounded"
/>

<input
v-model="password"
type="password"
placeholder="Password"
class="border w-full px-3 py-2 rounded"
/>

<button
@click="handleRegister"
class="w-full bg-blue-600 text-white py-2 rounded"
>
Register
</button>

<NuxtLink
to="/login"
class="block text-center text-sm text-blue-600"
>
Already have account? Login
</NuxtLink>

</div>

</div>

</template>