import { describe, expect, it } from 'vitest'
import { useAuthStore } from '../stores/authStore'

describe('authStore', () => {
  it('seeds the built-in admin account so it can always sign in', () => {
    const auth = useAuthStore()

    auth.login('admin@gmail.com', 'admin123')

    expect(auth.user?.role).toBe('admin')
    expect(localStorage.getItem('token')).toBe('demo-token')
  })

  it('registers new users as members', () => {
    const auth = useAuthStore()

    auth.register('Sara', 'sara@example.com', 'secret1')
    auth.login('sara@example.com', 'secret1')

    expect(auth.user?.name).toBe('Sara')
    expect(auth.user?.role).toBe('member')
  })

  it('does not sign in with a wrong password', () => {
    const auth = useAuthStore()

    auth.login('admin@gmail.com', 'wrong-password')

    expect(auth.user).toBeNull()
    expect(localStorage.getItem('token')).toBeNull()
  })

  it('restores the signed-in user from storage', () => {
    useAuthStore().login('admin@gmail.com', 'admin123')

    const fresh = useAuthStore()
    fresh.user = null
    fresh.loadUser()

    expect(fresh.user?.email).toBe('admin@gmail.com')
  })

  it('clears the session on logout', () => {
    const auth = useAuthStore()
    auth.login('admin@gmail.com', 'admin123')

    auth.logout()

    expect(auth.user).toBeNull()
    expect(localStorage.getItem('token')).toBeNull()
    expect(localStorage.getItem('user')).toBeNull()
  })
})
