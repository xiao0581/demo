import { defineStore } from 'pinia'

interface User {
  username: string
  token: string
}

interface AuthState {
  user: User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
  }),

  actions: {
    async login(credentials: { username: string; password: string }): Promise<void> {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        })

        if (!response.ok) {
          throw new Error('Invalid username or password')
        }

        const data = await response.json()

        this.user = {
          username: data.username,
          token: data.token,
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message || 'Failed to login')
        } else {
          throw new Error('Failed to login')
        }
      }
    },

    logout(): void {
      this.user = null
    },

    isAuthenticated(): boolean {
      return !!this.user
    },
  },
})
