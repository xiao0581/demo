<template>
  <q-page class="flex flex-center">
    <div></div>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="handleLogin">
          <q-input
            v-model="username"
            label="Username"
            outlined
            required
            :rules="[(val) => !!val || 'Username is required']"
          />

          <q-input
            v-model="password"
            label="Password"
            type="password"
            outlined
            required
            :rules="[(val) => !!val || 'Password is required']"
            class="q-mt-md"
          />

          <q-btn
            type="submit"
            label="Login"
            color="primary"
            class="q-mt-lg"
            :loading="loading"
            :disable="loading"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const username = ref<string>('')
    const password = ref<string>('')
    const loading = ref<boolean>(false)

    const authStore = useAuthStore()
    const router = useRouter()

    const handleLogin = async (): Promise<void> => {
      loading.value = true
      try {
        await authStore.login({ username: username.value, password: password.value })

        Notify.create({
          type: 'positive',
          message: 'Login successful!',
        })

        await router.push('/message')
      } catch (error: unknown) {
        const message = (error as Error).message || 'An unknown error occurred.'
        Notify.create({
          type: 'negative',
          message,
        })
      } finally {
        loading.value = false
      }
    }

    return {
      username,
      password,
      loading,
      handleLogin,
    }
  },
})
</script>

<style scoped>
.loginTitle {
  font-size: 2.5rem;
  font-weight: bold;
}
.q-page {
  min-height: 100vh;
  background: #f5f5f5;
}
.q-card {
  margin-top: 0;
  border-radius: 20px;
  width: 350px;
}
</style>
