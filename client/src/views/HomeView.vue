<template>
  <input v-model="pokemonName" placeholder="Start typing..." />
  <div v-for="result in results">
    <li v-if="result" @click="setSearch(result)">{{ result }}</li>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import pokemonJson from '../../data/pokemon-v1.json';

let pokemonName = ref<string>('');
let results = ref<Array<null | string>>([]);

const handleSearch = (pokemonName: string) => {
  pokemonName = pokemonName.toLowerCase();
  let matchResults = [];
  for (let i = 0; i < pokemonJson.length; i++) {
    if (pokemonJson[i].toLowerCase().indexOf(pokemonName) === 0) {
      matchResults.push(pokemonJson[i]);
    }
    if (matchResults.length >= 4) {
      break;
    }
  }
  if (matchResults.length === 0) {
    results.value = ['No results :('];
  } else {
    results.value = matchResults;
  }
  console.log(matchResults);
};

const setSearch = (clickedName: string) => {
  pokemonName.value = clickedName;
};

watch(
  pokemonName,
  async () => {
    if (pokemonName.value.length > 1) {
      handleSearch(pokemonName.value);
    } else {
      results.value = [];
    }
  },
  { immediate: true }
);
</script>
