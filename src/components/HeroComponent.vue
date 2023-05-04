<template>
  <section class="row q-py-lg justify-center hero">
    <h1 v-if="store.searchLoading">Loading...</h1>
    <div v-else class="col-10">
      <div class="row q-pa-lg justify-between">
        <div :class="[`${isHomeComponent ? 'col-5' : 'col-7'}`]">
          <h1 :class="['q-mt-none',
                       'q-mb-sm',
                       'text-weight-bold',
                       'text-uppercase',
                       `${isHomeComponent ? 'text-h2' : 'text-h3'}`]"
          >{{ recipe.title }}</h1>
          <p v-if="!isHomeComponent" class="text-subtitle1 hero__summary" v-html="recipe.summary" />
          <div class="divider hero__divider"></div>

          <div class="hero__diets">
            <div v-for="diet in recipe.diets"
                 :key="diet"
                 class="hero__diet">
              {{ diet }}
            </div>
          </div>

          <q-btn v-if="isHomeComponent" padding="15px 40px"
                 color="accent"
                 text-color="secondary"
                 label="Read now"
                 unelevated
                 class="hero__btn" />
        </div>
        <div :class="[`${isHomeComponent ? 'col-6' : 'col-4'}`]">
          <q-img :src="recipe.image"
                 spinner-color="secondary"
                 spinner-size="82px"
                 :ratio="isHomeComponent ? 16 / 10 : 10 / 12"
                 img-class="hero__img" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '../stores/store'
import { Recipe, RecipeInformation } from './models';

interface Props {
  recipe: Recipe | RecipeInformation;
  isHomeComponent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isHomeComponent: true
});

const store = useStore();

onMounted(() => {
  if (props.isHomeComponent) {
    store.getRandomRecipes();
    startPolling();
  }
})

function startPolling() {
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * store.findedRecipes.length);
    store.recipe = store.findedRecipes[randomIndex];
  }, 5000);
}
</script>

<style lang="sass">
.hero
  &__img
    border-radius: 80px

  &__summary
    a
      color: #75a4ea
      transition: all .2s ease
      &:hover
        color: $cream
</style>

<style lang="sass" scoped>
.hero
  color: #fff
  background: $primary

  &__divider
    margin-bottom: 20px

  &__diets
    margin-bottom: 40px
    display: flex
    gap: 10px 14px
    flex-wrap: wrap

  &__diet
    padding: 5px 20px
    font-size: 18px
    line-height: 26px
    color: $secondary
    border: 1px solid $secondary
    border-radius: 15px
    white-space: nowrap

  &__btn
    border-radius: 15px

  &__divider
    background: $secondary
</style>
