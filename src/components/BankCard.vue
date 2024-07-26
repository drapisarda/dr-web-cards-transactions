<script lang="ts" setup>

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
})

// TODO there would be nice a proper field
const cardType = props.description.replace(' Card', '').toLowerCase()
</script>

<template>
  <div
    :class="[`bank-card bank-card--${cardType} rounded-xl bg-gray-300 hover:bg-blue-200 px-5 py-2 pb-10 md:pb-20 cursor-pointer`]">
    <div class="bank-card__id font-semibold">{{ id }}</div>
    <div class="bank-card__description">{{ description }}</div>
  </div>
</template>