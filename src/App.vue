<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import TransactionsFilter from '@/components/TransactionsFilter.vue';
import TransactionList from '@/components/TransactionList.vue';
import { getCard, getCards } from '@/composables/getCards'
import getTransactions from './composables/getTransactions';
import BankCardList from './components/BankCardList.vue';
import type { Card, Transaction } from './types/types';
import { debounce } from './composables/debounce';

const cards = ref<Card[]>()
const transactions = ref<Transaction[]>([])
const selectedCard = ref<Card>()
const filterAmount = ref<number>()

onBeforeMount(async () => {
  cards.value = await getCards()
  await selectCard(cards.value[0].id)
})

//TODO filter on apiRequest so api call with card+amount or complex filter
const selectCard = async (cardId: string) => {
  selectedCard.value = await getCard(cardId)
  filterAmount.value = undefined
  await filterTransactions(filterAmount.value)
}

const filterTransactions = async (newAmount: number | undefined) => {
  filterAmount.value = newAmount
  if (!selectedCard.value) return
  transactions.value = await getTransactions(selectedCard.value.id, filterAmount.value)
}

watch(filterAmount, debounce((newValue) => {
  filterTransactions(newValue)
}, 300))
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
