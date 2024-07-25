<template>
  <div class="filter-transaction mb-20">
    <div class="container">
      <label for="search-input" class="p-3 block font-semibold">
        <slot />
      </label>
      <input id="search-input" type="text" placeholder="Amount"
        class="block w-full px-5 py-2 border-2 border-black rounded-md">
    </div>
  </div>
</template>

<script lang="ts" setup></script>