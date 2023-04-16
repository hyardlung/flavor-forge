<template>
  <section class="row q-py-lg justify-center">
    <div class="col-10">
      <div class="row q-pa-lg q-mb-sm">
        <custom-title>
          <template #pre-title>In </template>
        <template #dymamic-part>{{ store.currentDiet }}</template>
          <template #title>Diet</template>
        </custom-title>

        <div class="row col-12 card-wrapper">
          <recipe-card :recipe="recipe" v-for="recipe in store.findedRecipesByDiet" :key="recipe.id"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'src/stores/store';
import CustomTitle from './CustomTitle.vue';
import RecipeCard from './RecipeCard.vue';

const store = useStore();

onMounted(() => {
  // store.getRecipesByDiet(store.currentDiet) // TODO: uncommented before submitting it for review
  // getNextDiet() // TODO: here too
})

const getNextDiet = () => {
  store.currentDiet = store.diets[0]
  let index = 1;
  const intervalId = setInterval(() => {
    store.currentDiet = store.diets[index];
    store.getRecipesByDiet(store.currentDiet)
    index = (index + 1) % store.diets.length;
  }, 10000);

  return () => {
    clearInterval(intervalId);
  };
};
</script>

<style lang="sass" scoped>
.card-wrapper
  margin-top: 50px
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 40px
</style>
