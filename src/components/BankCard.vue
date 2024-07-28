<script lang="ts" setup>
import { computed } from 'vue';


const props = defineProps({
  id: {
    type: String,
    default: '#'
  },
  description: {
    type: String,
    default: '#'
  },
})

const isDummy = computed((): boolean => props.id === '#' || props.description === '#')

// TODO there would be nice a proper field
const cardType = props.description.replace(' Card', '').toLowerCase()
</script>

<template>
  <div
    :class="[`bank-card bank-card--${cardType} rounded-xl bg-gray-300 px-5 py-2 pb-10 md:pb-20 cursor-pointer`, { 'shiner': isDummy }]">
    <div class="bank-card__id font-semibold"> {{ id }}</div>
    <div class=" bank-card__description">{{ description }}</div>
  </div>
</template>