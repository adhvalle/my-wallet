<script setup>
import { computed, ref } from 'vue'
import { getWallet } from '@/models/wallet'
import DrawerCrypto from '@/widgets/DrawerCrypto.vue'

const myWallet = computed(getWallet)
const showDrawerCrypto = ref(false)
</script>

<template>
  <button @click="showDrawerCrypto = true">Send crypto</button>

  <p>email</p>
  <div><pre>{{ myWallet.email }}</pre></div>
  <p>balance</p>
  <div><pre>{{ myWallet.balance }}</pre></div>
  <p>transactions</p>
  <div><pre>{{ myWallet.transactions }}</pre></div>

  <DrawerCrypto 
    :is-visible="showDrawerCrypto" 
    @on-close="showDrawerCrypto = false"
  />
</template>
