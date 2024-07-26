<script lang="ts" setup>
import { debounce } from '@/composables/debounce';

//TODO what about model?
const props = defineProps({
  onInput: {
    type: Function,
    default: () => { }
  },
  debounceDelay: {
    type: Number,
    default: 300
  }
})

const manageInput = debounce((e) => props.onInput(e.target.value), props.debounceDelay)
</script>

<template>
  <div class="filter-transaction mb-20">
    <div class="container">
      <label for="search-input" class="p-3 block font-semibold">
        <slot />
      </label>
      <input id="search-input" type="number" placeholder="Amount" @input="manageInput"
        class="block w-full px-5 py-2 border-2 border-black rounded-md">
    </div>
  </div>
</template>