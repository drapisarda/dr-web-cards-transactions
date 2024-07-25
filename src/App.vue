<script setup lang="ts">
import FilterTransaction from '@/components/FilterTransaction.vue';
import TransactionList from '@/components/TransactionList.vue';
import transactions from '@/data/transactions.json'
import { getCards } from '@/utilities/utilities'
import { onMounted, ref } from 'vue';
import BankCardList from './components/BankCardList.vue';

let cards = ref()
onMounted(async () => {
  cards.value = await getCards()
})

const testData = transactions["lkmfkl-mlfkm-dlkfm"]
</script>

<template>
  <header>
  </header>

  <main>
    <BankCardList :cards="cards" />
    <FilterTransaction> Amount filter </FilterTransaction>
    <TransactionList :transactions="testData" />
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
