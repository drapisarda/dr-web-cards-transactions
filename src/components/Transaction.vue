<script setup lang="ts">
defineProps({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  }
})
</script>

<template>
  <div class="transaction px-7 py-9 bg-gray-300 flex rounded-md">
    <div class="transaction__description basis-4/5">
      {{ description }}
    </div>
    <div class="transaction__amount text-center basis-1/5">
      {{ amount.toString().replace('.', ',') }}€
    </div>
  </div>

</template>

<style lang="scss"></style>