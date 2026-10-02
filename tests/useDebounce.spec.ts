import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { useDebounce } from '../app/composables/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('only updates after the delay has passed', async () => {
    const search = ref('vue')
    const debounced = useDebounce(() => search.value, 400)

    search.value = 'nuxt'
    await nextTick()
    vi.advanceTimersByTime(399)
    expect(debounced.value).toBe('vue')

    vi.advanceTimersByTime(1)
    expect(debounced.value).toBe('nuxt')
  })

  it('keeps only the last value when typing quickly', async () => {
    const search = ref('')
    const debounced = useDebounce(() => search.value, 300)

    for (const value of ['p', 'pi', 'pin', 'pinia']) {
      search.value = value
      await nextTick()
      vi.advanceTimersByTime(100)
    }
    vi.advanceTimersByTime(300)

    expect(debounced.value).toBe('pinia')
  })
})
