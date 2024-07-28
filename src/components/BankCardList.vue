<script lang="ts" setup>
import type { Card } from '@/types/types';
import type { PropType } from 'vue';
import BankCard from './BankCard.vue';

defineProps({
  cards: {
    type: Object as PropType<Card[]>,
    default: [],
  },
  selectedCardId: {
    type: String,
    default: undefined
  },
  cardSelector: {
    type: Function,
    default: () => { }
  }
})
</script>

<template>
  <div class="bank-card-list mb-5">
    <div class="container md:flex justify-between">
      <div
        :class="['bank-card-list__item md:basis-2/5 mb-4 md:mb-0', { 'bank-card-list__item--active': selectedCardId === item.id }]"
        v-for="(item) in cards" :key="item.id" @click="cardSelector(item.id)">
        <BankCard
          :class="['h-full', { 'hover:bg-blue-200 hover:shadow-lg hover:shadow-slate-200 transition-shadow cursor-pointer': selectedCardId !== item.id }]"
          :style="{ backgroundColor: item.color }" :description="item.description" :id="item.id" />
      </div>
    </div>
  </div>
</template>