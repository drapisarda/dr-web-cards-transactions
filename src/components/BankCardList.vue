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
  <div class="bank-card-list mb-7">
    <div class="container flex justify-between">
      <div class="bank-card-list__item mb-2 basis-2/5" v-for="(item, index) in cards" :key="index"
        @click="cardSelector(item.id)">
        <BankCard :description="item.description" :id="item.id" />
      </div>
    </div>
  </div>
</template>