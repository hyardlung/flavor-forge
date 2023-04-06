<template>
  <div>
    <h1>Recipes</h1>
    <q-card class="my-card">
      <img :src="store.recipe.image">

      <q-card-section>
        <div class="text-h6">{{ store.recipe.title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        test
      </q-card-section>
    </q-card>

  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useStore } from '../stores/store'

const store = useStore();

onBeforeMount(() => {
  store.getRandomRecipe()
})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
