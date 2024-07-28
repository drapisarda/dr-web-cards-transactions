<script lang="ts" setup>
const model = defineModel()
</script>

<template>
  <div class="filter-transaction mb-10">
    <div class="container">
      <label for="search-input" class="p-3 block font-semibold">
        <slot />
      </label>
      <input id="search-input" type="number" v-model="model" placeholder="Amount"
        class="block w-full px-5 py-2 border-2 border-black rounded-md hover:shadow-lg hover:shadow-slate-200 transition-shadow">
    </div>
  </div>
</template>