<template>
  <hero-component :recipe="store.recipeInformation"
                  :is-home-component="false" />
  <!-- ingredients -->
  <section class="row q-pa-lg justify-center">
    <div class="column col-md-10 col-xs-12">
      <h2 class="text-h4 text-uppercase recipe__title">Ingredients</h2>
      <q-spinner-clock v-if="store.searchLoading" size="4em" color="primary" />
      <div v-else class="row q-pa-lg justify-between">
        <div class="col-md-7 col-xs-12 q-gutter-y-lg">
          <ingredient-card v-for="ingredient in store.recipeInformation.extendedIngredients"
                           :key="ingredient.id"
                           :ingredient="ingredient" />
        </div>

        <div class="col-md-4 col-xs-12">
          <div class="q-pa-sm nutrients-wrapper">
            <nutrients-chart :nutrients="store.nutrients" />
            <p class="q-pl-md q-pt-md"
               style="font-size: 20px">
              <span class="q-mr-sm">{{ store.recipeInformation.servings }}</span>
              <span>{{ store.recipeInformation.servings > 1 ? 'servings' : 'serving' }}</span>
            </p>
          </div>
          <cooking-data />
        </div>
      </div>
    </div>
  </section>

  <!-- cooking -->
  <section class="row q-pa-lg">
    <div class="column col-10">
      <h2 class="text-h4 text-uppercase recipe__title">Cooking</h2>
      <q-spinner-clock v-if="store.searchLoading" size="4em" color="primary" />
      <template v-else>
        <cooking-step v-for="step in store.recipeInstruction" :key="step.number" :step="step"/>
      </template>
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
import CookingData from 'src/components/CookingData.vue';
import CookingStep from 'src/components/CookingStep.vue';

const route = useRoute();
const store = useStore();

onMounted(() => {
  const id = route.params.id as number | string;
  store.getRecipeDetails(id);
  store.getRecipeInstruction(id);
});
</script>

<style lang="sass" scoped>
.recipe
  &__title
    color: $primary

.nutrients-wrapper
  background-color: #FFFEF6
  border-radius: 10px
  filter: drop-shadow(0px 3px 5px rgba(0, 30, 47, 0.1))
  max-width: 600px
  @media screen and (max-width: 1023px)
    margin-top: 24px
    max-width: 400px
</style>
