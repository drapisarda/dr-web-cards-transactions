<script setup lang="ts">
import { computed, type PropType } from 'vue'
import TransactionContent from './TransactionContent.vue'
import { type Transaction } from '@/types/types.d'
import { useVirtualList } from '@vueuse/core'

const props = defineProps({
  transactions: {
    type: Array as PropType<Transaction[]>,
    required: true
  },
  color: {
    type: String,
    default: '#d1d5db'
  }
})

const transactionList = computed(() => props.transactions)

const { list, containerProps, wrapperProps } = useVirtualList(transactionList, {
  itemHeight: 96 // h-[24] + py-5*2
})
</script>

<template>
  <div class="transaction-list" v-bind="containerProps">
    <div class="container">
      <div v-bind="wrapperProps">
        <div
          class="transaction-list__item mb-5 h-[24]"
          v-for="{ index, data } in list"
          :key="index"
        >
          <TransactionContent
            :description="data.description"
            :amount="data.amount"
            :style="{ backgroundColor: color }"
          />
        </div>

        <div class="transaction-list__empty" v-show="list.length === 0">
          <h3 class="text-xl font-semibold">No transactions found for this card and amount</h3>
        </div>
      </div>
    </div>
  </div>
</template>
