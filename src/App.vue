<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import FilterTransaction from '@/components/FilterTransaction.vue';
import TransactionList from '@/components/TransactionList.vue';
import getCards, { getCard } from '@/composables/getCards'
import getTransactions from './composables/getTransactions';
import BankCardList from './components/BankCardList.vue';
import type { Card, Transaction } from './types/types';

const cards = ref<Card[]>()
const transactions = ref<Transaction[]>([])
const selectedCard = ref<Card>()
const filterAmount = ref<string>('0')

onBeforeMount(async () => {
  cards.value = await getCards()
  await selectCard(cards.value[0].id)
})

//TODO filter on apiRequest so api call with card+amount or complex filter
const selectCard = async (cardId: string) => {
  selectedCard.value = await getCard(cardId)
  await filterTransactions(filterAmount.value)
}

const filterTransactions = async (newAmount: string) => {
  filterAmount.value = newAmount
  transactions.value = await getTransactions(selectedCard.value.id, filterAmount.value)
}
</script>

<template>
  <header>
  </header>
  <main>
    <BankCardList :cards="cards || []" :cardSelector="selectCard" />
    <FilterTransaction :onInput="filterTransactions" :debounceDelay="300"> Amount filter </FilterTransaction>
    <TransactionList :transactions="transactions" />
  </main>
</template>
