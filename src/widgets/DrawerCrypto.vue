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

  setTimeout(() => { formResponse.value = '' }, 3000)
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
    <div class="drawer-crypto">
      <div 
        v-if="formResponse"
        class="drawer-crypto__response"
        :class="`drawer-crypto__response-${formResponse}`"
      >
        {{ formResponses[formResponse] }}
      </div>
      <form 
        @submit.prevent="submit"
        class="drawer-crypto__form"
      >
        <label class="drawer-crypto__label">Receiver</label>
        <select 
          v-model="formData.receiver"
          class="drawer-crypto__select"
        >
          <option
            v-for="contact in myContacts"
            :key="contact.email"
            :value="contact.email"
            v-text="contact.name"
          />
        </select>
        <label class="drawer-crypto__label">Currency</label>
        <div class="drawer-crypto__options">
          <div 
            v-for="currency in currencies"
            :key="currency"
            class="drawer-crypto__option"
          >
            <input
              v-model="formData.currency"
              class="drawer-crypto__radio"
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
        <label class="drawer-crypto__label">Amount</label>
        <input 
          v-model="formData.amount"
          type="text"
        >
        <button class="drawer-crypto__button">Send transaction</button>
      </form>
    </div>
  </TheDrawer>
</template>

<style>
.drawer-crypto {
  margin: var(--size-lg) auto 0;
  width: var(--wrapper);
}

.drawer-crypto__select {
  height: var(--size-xl);
}

.drawer-crypto__select,
.drawer-crypto__options {
  margin-bottom: var(--size-lg);
}

.drawer-crypto__form {
  display: flex;
  flex-direction: column;
}

.drawer-crypto__label {
  font-size: var(--font-xs);
  font-weight: bold;
  margin-bottom: var(--size-xs);
}

.drawer-crypto__options {
  display: flex;
}

.drawer-crypto__option {
  display: flex;
  align-items: center;
  margin-right: var(--size-xs);
}

.drawer-crypto__radio {
  margin: 0 var(--size-xs) 0 0;
}

.drawer-crypto__button {
  margin-top: var(--size-lg);
}

.drawer-crypto__response {
  color: var(--color-white);
  padding: var(--size-xs);
  font-size: var(--font-xs);
  font-weight: bold;
  margin-bottom: var(--size-lg);
  background-color: var(--color-black);
}

.drawer-crypto__response-success {
  background-color: var(--color-primary);
}

.drawer-crypto__response-error {
  background-color: var(--color-error);
}
</style>
