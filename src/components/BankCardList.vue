<script lang="ts" setup>
import type { Card } from '@/types/types';
import type { PropType } from 'vue';
import BankCard from './BankCard.vue';

defineProps({
  cards: {
    type: Object as PropType<Card[]>,
    required: true
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
      <div class="bank-card-list__item md:basis-2/5 mb-4 md:mb-0" v-for="(item, index) in cards" :key="index"
        @click="cardSelector(item.id)">
        <BankCard class="h-full" :description="item.description" :id="item.id" />
      </div>
    </div>
  </div>
</template>