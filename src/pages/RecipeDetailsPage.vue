<template>
  <hero-component :recipe="store.recipeInformation" :is-home-component="false"/>
  <section class="row q-py-lg justify-center">
    <div class="col-10">
      <h1 v-if="store.searchLoading">Loading...</h1>
      <article v-else class="row q-pa-lg justify-between">
        <div class="col-5">
          <h1 class="text-h2 recipe__title">{{ store.recipeInformation.title }}</h1>
        </div>
        <div class="col-5">
          <q-img :src="store.recipeInformation.image"
                spinner-color="secondary"
                spinner-size="82px"
                :ratio="10 / 16"
                img-class="hero__img" />
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

const route = useRoute();
const store = useStore();

onMounted(() => {
  const id = route.params.id as number | string;
  store.getRecipeDetails(id);
});

</script>

<style lang="sass" scoped>
.recipe

  &__title
    font-size: 48px
    font-weight: 700
    text-transform: uppercase
    color: $primary
</style>
