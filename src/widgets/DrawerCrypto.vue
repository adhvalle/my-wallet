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
const formResponse = ref('')
const formResponses = {
  success: 'Your transaction has been sent.',
  error: 'Something was wrong try again later.'
}

const openDrawerCrypto = async () => {
  await retrieveContacts()
  showDrawer.value = true
}

const submit = async () => {
  try {
    await sendTransaction(formData)
    retrieveWallet(true)
    _resetForm()
    formResponse.value = 'success'
  } catch (error) {
    formResponse.value = 'error'
  }
}

const _resetForm = () => {
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
    <div v-if="formResponse">
      {{ formResponses[formResponse] }}
    </div>
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
