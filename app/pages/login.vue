<script setup lang="ts">

import { useAuthStore } from '../../stores/authStore'

useSeo({
  title: "Login",
  description: "Login to ProjectFlow to manage your projects and tasks.",
  path: "/login"
})

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

function handleLogin() {

  error.value = ''

  if (!authStore.login(email.value.trim(), password.value)) {
    error.value = 'Incorrect email or password.'
    return
  }

  router.push('/dashboard')

}

/* Signs in with the built-in demo admin account */
function tryDemo() {

  email.value = 'admin@gmail.com'
  password.value = 'admin123'

  handleLogin()

}

</script>

<template>

<div class="min-h-screen flex items-center justify-center bg-gray-100">

<form
class="bg-white p-8 rounded shadow w-96 space-y-4"
@submit.prevent="handleLogin"
>

<h1 class="text-xl font-semibold text-center">
Login
</h1>

<input
v-model="email"
type="email"
placeholder="Email"
autocomplete="username"
class="border w-full px-3 py-2 rounded"
/>

<input
v-model="password"
type="password"
placeholder="Password"
autocomplete="current-password"
class="border w-full px-3 py-2 rounded"
/>

<p
v-if="error"
role="alert"
class="text-sm text-red-600"
>
{{ error }}
</p>

<button
type="submit"
class="w-full bg-blue-600 text-white py-2 rounded"
>
Login
</button>

<button
type="button"
class="w-full border border-blue-600 text-blue-600 py-2 rounded"
@click="tryDemo"
>
Try the demo
</button>

<p class="text-xs text-center text-gray-500">
Demo account: admin@gmail.com / admin123
</p>

<NuxtLink
to="/register"
class="block text-center text-sm text-blue-600"
>
Create account
</NuxtLink>

</form>

</div>

</template>
