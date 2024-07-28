<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import TransactionsFilter from '@/components/TransactionsFilter.vue';
import TransactionList from '@/components/TransactionList.vue';
import { getCard, getCards } from '@/composables/getCards'
import getTransactions from './composables/getTransactions';
import BankCardList from './components/BankCardList.vue';
import type { Card, Transaction } from './types/types';
import { debounce } from './composables/debounce';

const dummyCards: Card[] = [
  { id: '#', description: '#', color: '#ebebeb' },
  { id: '#', description: '#', color: '#ebebeb' },
]

const dummyTransactions: Transaction[] = Array.from(Array(12)).map(item => {
  return {
    id: '#',
    amount: 0,
    description: '#',
  }
})

const cards = ref<Card[]>(dummyCards)
const transactions = ref<Transaction[]>(dummyTransactions)
const selectedCard = ref<Card>()
const filterAmount = ref<number>()

onBeforeMount(async () => {
  cards.value = await getCards()
  await selectCard(cards.value[0].id)
})

//TODO filter on apiRequest so api call with card+amount or complex filter
const selectCard = async (cardId: string) => {
  if (cardId === selectedCard.value?.id) return

  transactions.value = dummyTransactions
  selectedCard.value = await getCard(cardId)
  filterAmount.value = undefined
  await filterTransactions(filterAmount.value)
}

const filterTransactions = async (newAmount: number | undefined) => {
  transactions.value = dummyTransactions
  filterAmount.value = newAmount
  if (!selectedCard.value) return
  transactions.value = await getTransactions(selectedCard.value.id, filterAmount.value)
}

watch(filterAmount, debounce((newValue) => {
  filterTransactions(newValue)
}, 500))
</script>

<template>
  <header>
  </header>
  <main class="py-5 flex flex-col h-screen">
    <BankCardList :cards="cards" :cardSelector="selectCard" :selectedCardId="selectedCard?.id" />
    <TransactionsFilter v-model="filterAmount"> Amount filter
    </TransactionsFilter>
    <TransactionList class="flex-1" :transactions="transactions" :color="selectedCard?.color" />
  </main>
</template>
