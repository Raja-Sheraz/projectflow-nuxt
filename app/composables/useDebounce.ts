import { ref, watch } from 'vue'

export function useDebounce<T>(value: () => T, delay: number = 400) {
  const debounced = ref(value()) as { value: T }

  let timeout: ReturnType<typeof setTimeout>

  watch(
    value,
    (newValue) => {
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        debounced.value = newValue
      }, delay)
    },
    { immediate: true }
  )

  return debounced
}