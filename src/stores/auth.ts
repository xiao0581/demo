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
    // 模拟登录
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

    // 模拟注册
    async register(credentials: {
      username: string
      password: string
      email: string
    }): Promise<void> {
      try {
        // 模拟延迟
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // 模拟成功注册返回的用户信息
        const mockResponse = {
          username: credentials.username,
          token: 'mock-token-12345', // 模拟 token
        }

        // 设置用户状态
        this.user = {
          username: mockResponse.username,
          token: mockResponse.token,
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message || 'Failed to register')
        } else {
          throw new Error('Failed to register')
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
