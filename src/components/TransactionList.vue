<script setup lang="ts">
import transactions from '../testdata/transactions.json'
import Transaction from './Transaction.vue';

const transactionList = transactions["lkmfkl-mlfkm-dlkfm"]

</script>

<template>
  <div class="transaction-list">
    <div class="container">
      <div class="transaction-list__item mb-5" v-for="(item) in transactionList" :key="item.id">
        <Transaction :description="item.description" :amount="item.amount" />
      </div>
    </div>
  </div>
</template>