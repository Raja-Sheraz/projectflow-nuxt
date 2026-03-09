<script setup lang="ts">
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

  </div>

</template>