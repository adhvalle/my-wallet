<script setup>
import { reactive } from 'vue'
import { login } from '@/api/auth'
import { setLoginData } from '@/models/auth'
import { getRouter } from '@/router'

const formData = reactive({
  username: '',
  password: ''
})

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
  <main>
    <form @submit.prevent="submit">
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
