<template>
  <div v-for="result in results">
    <li @click="$emit('setSelectedPokemon', result)">{{ result }}</li>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  searchResults: Array<string>,
});
const emit = defineEmits(['setSelectedPokemon']);

const results = props.searchResults;
</script>
