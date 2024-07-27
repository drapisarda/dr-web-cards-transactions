<script setup lang="ts">
import type { PropType } from 'vue';
import TransactionContent from './TransactionContent.vue';
import { type Transaction } from '@/types/types';

defineProps({
  transactions: {
    type: Object as PropType<Transaction[]>,
    required: true
  },
  color: {
    type: String,
    default: '#d1d5db'
  }
})

</script>

<template>
  <div class="transaction-list">
    <div class="container">
      <div class="transaction-list__item mb-5" v-for="(item) in transactions" :key="item.id">
        <TransactionContent :description="item.description" :amount="item.amount" :style="{ backgroundColor: color }" />
      </div>
    </div>
  </div>
</template>