<template>
  <section class="row q-py-lg justify-center">
    <div class="col-md-10 col-xs-12">
      <div class="row q-pa-lg q-mb-sm justify-center">
        <custom-title>
          <template #pre-title>In </template>
          <template #dymamic-part>{{ store.currentDiet }}</template>
          <template #title>Diet</template>
        </custom-title>

        <div class="row col-md-12 q-gutter-lg card-wrapper">
          <recipe-card :recipe="recipe"
                       v-for="recipe in store.findedRecipesByDiet"
                       :key="recipe.id"
                       @card-click="goToRecipe(recipe.id)" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'src/stores/store';
import { getRecipesByDiet, getRecipeDetails } from 'src/api/service';
import { diets } from 'src/data/constants';
import CustomTitle from './CustomTitle.vue';
import RecipeCard from './RecipeCard.vue';

const store = useStore();

onMounted(() => {
  getNextDiet()
})

function getNextDiet() {
  store.currentDiet = diets.value[0];
  getRecipesByDiet(store.currentDiet);
  let index = 0;
  const intervalId = setInterval(() => {
    store.currentDiet = diets.value[index];
    getRecipesByDiet(store.currentDiet)
    index = (index + 1) % diets.value.length;
  }, 10000);

  onUnmounted(() => {
    clearInterval(intervalId);
  });
};

function goToRecipe(id: number) {
  getRecipeDetails(id);
}
</script>

<style lang="sass" scoped>
.card-wrapper
  margin-top: 50px
  width: 100%
  display: grid
  grid-template-columns: repeat(3, 1fr)
  @media screen and (max-width: 1023px)
    margin-top: 20px
    grid-template-columns: repeat(2, 1fr)
  @media screen and (max-width: 599px)
    margin-top: 0
    grid-template-columns: repeat(1, 1fr)
</style>
