<script setup>
import { computed, ref } from 'vue'
import { getWallet } from '@/models/wallet'
import TheDrawer from '@/components/TheDrawer.vue'

const myWallet = computed(getWallet)
const showDrawer = ref(false)
</script>

<template>
  <button @click="showDrawer = true">Send crypto</button>
  <TheDrawer 
    :is-visible="showDrawer" 
    @on-close="showDrawer = false"
  >
    <p>Drawer slot</p>
  </TheDrawer>

  <p>email</p>
  <div><pre>{{ myWallet.email }}</pre></div>
  <p>balance</p>
  <div><pre>{{ myWallet.balance }}</pre></div>
  <p>transactions</p>
  <div><pre>{{ myWallet.transactions }}</pre></div>
</template>
