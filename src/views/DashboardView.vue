<script setup>
import { computed, ref } from 'vue'
import { getWallet } from '@/models/wallet'
import DrawerCrypto from '@/widgets/DrawerCrypto.vue'

const myWallet = computed(getWallet)
const showDrawerCrypto = ref(false)

const transactionsList = computed(() => {
  return myWallet.value.transactions.slice(-5).reverse()
})
</script>

<template>
  <header class="dashboard__header">
    <img src="/images/logo.png" alt="my-wallet">
  </header>

  <main class="dashboard__wrapper">
    <div>
      <h1 class="dashboard__title">Hi, {{ myWallet.email }}</h1>
      <div class="dashboard__transactions">
        <h2 class="dashboard__subtitle">Transactions</h2>
        <button @click="showDrawerCrypto = true">Send crypto</button>
      </div>
      <ul>
        <li
          v-for="(transaction, index) in transactionsList"
          :key="index"
          class="dashboard__transaction-item"
        >
          <div class="dashboard__transaction">
            <span>{{ transaction.amount }}</span>
            <span>{{ transaction.currency }}</span>
            <span>{{ transaction.receiver }}</span>
            <span>{{ transaction.status }}</span>
          </div>
          <p>{{ transaction.description }}</p>
        </li>
      </ul>
    </div>
  </main>

  <DrawerCrypto 
    :is-visible="showDrawerCrypto" 
    @on-close="showDrawerCrypto = false"
  />
</template>

<style>
.dashboard__header {
  border-bottom: 1px solid black;
}

.dashboard__title {
  font-size: 24px;
}

.dashboard__subtitle {
  font-size: 18px;
}

.dashboard__wrapper {
  width: var(--wrapper);
  margin: 0 auto;
  padding-top: var(--size-lg);
}

.dashboard__transactions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--size-sm);
}

.dashboard__transaction {
  display: grid;
  gap: var(--size-sm);
  grid-template-columns: repeat(4, 1fr);
}

.dashboard__transaction-item {
  border-bottom: 1px solid black;
  margin-bottom: var(--size-sm);
}
</style>
