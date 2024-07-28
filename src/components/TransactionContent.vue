<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})

const isDummy = computed(() => props.description === '#' || props.amount === 0)
</script>

<template>
  <div
    :class="[
      `transaction px-3 py-5 md:px-7 md:py-9 bg-gray-300 flex rounded-md`,
      { shiner: isDummy }
    ]"
  >
    <div class="transaction__description basis-4/5">
      {{ description }}
    </div>
    <div class="transaction__amount text-center basis-1/5">
      {{ amount.toString().replace('.', ',') }}€
    </div>
  </div>
</template>

<style lang="scss"></style>
