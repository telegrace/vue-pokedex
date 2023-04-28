<template>
  <input v-model="pokemonName" placeholder="Start typing..." />
  <div v-if="pokemonName.length > 1">
    <div v-if="results.length > 0">
      <SearchResults
        :searchResults="results"
        @setSelectedPokemon="setSelectedPokemon"
      />
    </div>
    <div v-else>
      <p>No results</p>
    </div>
  </div>
  <div v-if="selectedPokemon.length > 0">
    <PokemonCardVue :selectedPokemon="selectedPokemon" />
  </div>
</template>

<script setup lang="ts">
import SearchResults from './SearchResults.vue';
import { ref, watch } from 'vue';
import pokemonJson from '../../data/pokemon-v1.json';
import PokemonCardVue from './PokemonCard.vue';

let pokemonName = ref<string>('');
let results = ref<Array<string>>([]);
let selectedPokemon = ref<string>('');

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
  results.value = matchResults;
};

const setSelectedPokemon = (pokemon: string) => {
  selectedPokemon.value = pokemon;
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
