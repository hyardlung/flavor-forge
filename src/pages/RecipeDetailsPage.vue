<template>
  <hero-component :recipe="store.recipeInformation" :is-home-component="false"/>
  <section class="row q-py-lg justify-center">
    <div class="column col-10">
      <h1 class="text-h4 text-uppercase recipe__title">Ingredients</h1>
      <h1 v-if="store.searchLoading">Loading...</h1>
      <article v-else class="row q-pa-lg justify-between">
        <div class="col-7 q-gutter-y-lg">
          <ingredient-card
            v-for="ingredient in store.recipeInformation.extendedIngredients"
            :key="ingredient.id"
            :ingredient="ingredient"/>
        </div>
        <div class="col-4">

          <nutrients-chart :nutrients="store.nutrients" />
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useStore } from 'src/stores/store'
import HeroComponent from 'src/components/HeroComponent.vue';
import IngredientCard from 'src/components/IngredientCard.vue';
import NutrientsChart from 'src/components/NutrientsChart.vue';

const route = useRoute();
const store = useStore();

onMounted(() => {
  const id = route.params.id as number | string;
  store.getRecipeDetails(id);
  console.log(store.nutrients)
});

</script>

<style lang="sass" scoped>
.recipe

  &__title
    color: $primary
</style>
