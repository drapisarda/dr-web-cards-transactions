<script setup lang="ts">
import FilterTransaction from '@/components/FilterTransaction.vue';
import TransactionList from '@/components/TransactionList.vue';
import { getCards, getTransactions } from '@/utilities/utilities'
import { onMounted, ref } from 'vue';
import BankCardList from './components/BankCardList.vue';
import type { Card, Transaction } from './types/types';

const cards = ref()
const transactions = ref<Transaction[]>([])
const selectedCard = ref<Card>()
onMounted(async () => {
  cards.value = await getCards()
  selectedCard.value = cards.value[0]
  transactions.value = (selectedCard.value) ? await getTransactions(selectedCard.value.id) : []
})

</script>

<template>
  <header>
  </header>

  <main>
    <BankCardList :cards="cards" />
    <FilterTransaction> Amount filter </FilterTransaction>
    <TransactionList :transactions="transactions" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
