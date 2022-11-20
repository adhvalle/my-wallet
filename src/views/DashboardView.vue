<script setup>
import { computed } from 'vue'
import { getWallet } from '@/models/wallet'

const myWallet = computed(getWallet)
</script>

<template>
  <p>email</p>
  <div><pre>{{ myWallet.email }}</pre></div>
  <p>balance</p>
  <div><pre>{{ myWallet.balance }}</pre></div>
  <p>transactions</p>
  <div><pre>{{ myWallet.transactions }}</pre></div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
