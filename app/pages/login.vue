<script setup lang="ts">

// It overwrite global seo
// useSeoMeta({
//   title: "Login | ProjectFlow",
//   description: "Login to ProjectFlow to manage your projects and tasks.",

//   ogTitle: "Login | ProjectFlow",
//   ogDescription: "Login to ProjectFlow project management system.",
//   ogType: "website",
//   ogUrl: "http://localhost:3000/login",

//   twitterCard: "summary_large_image",
//   twitterTitle: "Login | ProjectFlow",
//   twitterDescription: "Login to ProjectFlow project management system."
// })

// i create compoable for this and just use here
useSeo({
  title: "Login",
  description: "Login to ProjectFlow to manage your projects and tasks.",
  path: "/login"
})

import { useAuthStore } from '../../stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

function handleLogin() {

  authStore.login(email.value, password.value)

  router.push('/dashboard')

}



</script>

<template>

  <div class="p-10 max-w-md mx-auto">

    <h1 class="text-2xl font-bold mb-4">
      Login
    </h1>

    <input
      v-model="email"
      placeholder="Email"
      class="border p-2 w-full mb-3"
    />

    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="border p-2 w-full mb-3"
    />

    <button
      @click="handleLogin"
      class="bg-blue-500 text-white px-4 py-2"
    >
      Login
    </button>
    <NuxtLink
to="/register"
class="block text-center text-sm text-blue-600 mt-2"
>
Create account
</NuxtLink>

  </div>

</template>