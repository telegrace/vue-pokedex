<template>
  <div class="card">
    <h1>{{ props.selectedPokemon }}</h1>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <span
        ><img :src="pokemonInfo.image" :alt="props.selectedPokemon" />
      </span>
      <p>Abilities:</p>

      <div v-for="{ ability } in pokemonInfo.abilities">
        <li>
          <a :href="ability.url"> {{ ability.name }} </a>
        </li>
      </div>
      <p>Type(s)</p>
      <div v-for="{ type } in pokemonInfo.types">
        <li>{{ type.name }}</li>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const props = defineProps({
  selectedPokemon: { type: String, required: true },
});

let pokemonInfo = ref({
  image: '',
  abilities: [],
  types: [],
});

let loading = ref<boolean>(false);

watchEffect(async () => {
  loading.value = true;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${props.selectedPokemon.toLowerCase()}`
  );

  const responseJson = await response.json();
  pokemonInfo.value = {
    image: responseJson.sprites['front_default'],
    abilities: responseJson.abilities,
    types: responseJson.types,
  };
  loading.value = false;
});
</script>
