<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { sendTransaction } from '@/api/wallet'
import { getContacts, retrieveContacts, retrieveWallet } from '@/models/wallet'
import TheDrawer from '@/components/TheDrawer.vue'

const props = defineProps({
  isVisible: Boolean
})

defineEmits(['on-close'])

const myContacts = computed(getContacts)
const showDrawer = ref(false)
const formData = reactive({
  amount: '',
  currency: '',
  description: 'MyWallet transaction',
  receiver: ''
})
const currencies = ['ETH', 'DOGE', 'BTC']

const openDrawerCrypto = async () => {
  await retrieveContacts()
  showDrawer.value = true
}

const submit = async () => {
  await sendTransaction(formData)
  retrieveWallet(true)
  formData.amount = ''
  formData.currency = ''
  formData.receiver = ''
}

watch(() => props.isVisible, value => {
  value ? openDrawerCrypto() : showDrawer.value = false
})
</script>

<template>
  <TheDrawer 
    :is-visible="showDrawer" 
    @on-close="$emit('on-close')"
  >
    <pre>{{ formData }}</pre>

    <form @submit.prevent="submit">
      <select v-model="formData.receiver">
        <option
          v-for="contact in myContacts"
          :key="contact.email"
          :value="contact.email"
          v-text="contact.name"
        />
      </select>
      <div>
        <div 
          v-for="currency in currencies"
          :key="currency"
        >
          <input
            v-model="formData.currency"
            type="radio"
            name="currency"
            :key="currency"
            :id="currency"
            :value="currency"
          >
          <label 
            :for="currency" 
            v-text="currency"
          />
        </div>
      </div>
      <input 
        v-model="formData.amount"
        type="text"
      >
      <button>Send transaction</button>
    </form>
  </TheDrawer>
</template>
