import { defineStore } from "pinia"
import { ref } from "vue"

export const useUiStore = defineStore("ui", () => {

  const loading = ref(false)

  let startTime = 0

  function startLoading() {
    startTime = Date.now()
    loading.value = true
  }

  function stopLoading() {

    const elapsed = Date.now() - startTime
    const remaining = 400 - elapsed

    if (remaining > 0) {
      setTimeout(() => {
        loading.value = false
      }, remaining)
    } else {
      loading.value = false
    }

  }

  return {
    loading,
    startLoading,
    stopLoading
  }

})