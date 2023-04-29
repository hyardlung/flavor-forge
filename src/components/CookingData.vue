<template>
  <div class="column q-mt-lg q-col-gutter-lg">
    <div v-if="store.recipeInformation.preparationMinutes > 0" class="col">
      <p class="q-mb-sm cooking__text">Preparation time</p>
      <div class="row items-center">
        <q-icon :name="laStopwatchSolid" size="lg"/>
        <span class="q-ml-sm cooking__amount">{{store.recipeInformation.preparationMinutes }}</span>
        <span class="q-mt-sm q-ml-sm cooking__text">min</span>
      </div>
    </div>
    <div class="col">
      <p class="q-mb-sm cooking__text">Cooking time</p>
      <div class="row items-center">
        <q-icon :name="laStopwatchSolid" size="lg"/>
        <span class="q-ml-sm cooking__amount">{{store.recipeInformation.readyInMinutes }}</span>
        <span class="q-mt-sm q-ml-sm cooking__text">min</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from 'src/stores/store';
  import { laStopwatchSolid } from '@quasar/extras/line-awesome';

  const store = useStore();
</script>

<style lang="sass" scoped>
.cooking
  &__text
    font-size: 20px
    font-weight: 500

  &__amount
    font-size: 30px
</style>
