<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="handleLogin" class="form-container">
          <q-input
            v-model="username"
            label="Username"
            outlined
            required
            rounded
            style="width: 100%; max-width: 350px"
            label-color="primary"
            :rules="[(val) => !!val || 'Username is required']"
          />

          <q-input
            v-model="password"
            label="Password"
            type="password"
            outlined
            required
            rounded
            style="width: 100%; max-width: 350px"
            label-color="primary"
            :rules="[(val) => !!val || 'Password is required']"
          />

          <q-btn
            type="submit"
            label="Login"
            color="primary"
            rounded
            :loading="loading"
            :disable="loading"
          />
          <div class="signup-container">
            <span>Don't have an account?</span>
            <router-link to="/registers" class="signup-link">Sign Up</router-link>
          </div>
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

        await router.push('/')
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
.q-page {
  min-height: 100vh;
  background-image: url('src/assets/pic/login.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.q-card {
  margin-top: 200px;
  border-radius: 20px;
  width: 350px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  transition: all 0.3s ease;
}

.text-h6 {
  color: #6a7bff;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.q-btn {
  width: 100%;
  max-width: 250px;
}
</style>
