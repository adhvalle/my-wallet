<script setup>
import { login } from '@/api/auth'
import { setLoginData } from '@/models/auth'
import { getRouter } from '@/router'

const submit = async () => {
  try {
    const response = await login()
    setLoginData(response)
    getRouter().push({ name: 'dashboard' })
  } catch (error) {
    console.warn(error)
  }
}
</script>

<template>
  <main>
    <form @submit.prevent="submit">
      <input type="text" />
      <input type="password" /> 
      <button>submit</button>
    </form>
  </main>
</template>
