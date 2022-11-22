<script setup>
import { reactive } from 'vue'
import { login } from '@/api/auth'
import { getToken, setLoginData, logout } from '@/models/auth'
import { getRouter } from '@/router'

const formData = reactive({
  username: '',
  password: ''
})

if (getToken()) logout()

const submit = async () => {
  try {
    const response = await login(formData)
    setLoginData(response)
    getRouter().push({ name: 'dashboard' })
  } catch (error) {
    console.warn(error)
  }
}
</script>

<template>
  <main class="login-view">
    <img src="/images/logo.png" alt="my-wallet">
    <form 
      class="login-view__form"
      @submit.prevent="submit"
    >
      <input 
        v-model="formData.username"
        type="text"
      />
      <input 
        v-model="formData.password"
        type="password" 
      /> 
      <button>submit</button>
    </form>
  </main>
</template>

<style>
.login-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.login-view__form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--width-xs);
}
</style>
