<script setup lang="ts">

import { useAuthStore } from '../../stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

function logout() {
  authStore.logout()
  router.push('/login')
}

</script>

<template>

<div class="flex min-h-screen bg-gray-50">

  <!-- Sidebar -->
  <aside class="w-64 bg-white shadow-md p-5">

    <h2 class="text-xl font-bold mb-6">
      ProjectFlow
    </h2>

    <nav class="space-y-3">
<NuxtLink
  to="/dashboard"
  class="block px-2 py-1 rounded hover:text-blue-500"
  active-class="text-blue-600 font-semibold"
>
  Dashboard
</NuxtLink>

<NuxtLink
  to="/dashboard/projects"
  class="block px-2 py-1 rounded hover:text-blue-500"
  active-class="text-blue-600 font-semibold"
>
  Projects
</NuxtLink>

    </nav>

  </aside>


  <!-- Right Side -->
  <div class="flex-1 flex flex-col">

    <!-- Topbar -->
    <header class="bg-white shadow p-4 flex justify-between">

      <h1 class="font-semibold">
        Dashboard
      </h1>

      <div class="flex items-center gap-4">

        <span>
          {{ authStore.user?.name }}
        </span>

        <button
          @click="logout"
          class="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>

      </div>

    </header>


    <!-- Page Content -->
    <main class="p-6 flex-1 overflow-y-auto">

      <NuxtPage />

    </main>

  </div>

</div>

</template>