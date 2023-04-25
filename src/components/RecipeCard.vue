<template>
  <q-card class="card">
    <q-img :src="recipe.image">
      <div class="absolute-bottom ">
        {{ recipe.title }}
      </div>
    </q-img>
  </q-card>
</template>

<script setup lang="ts">
import { findedRecipe } from './models';

const props = defineProps<{
  recipe: findedRecipe
}>()
</script>

<style lang="sass" scoped>
.card
  border-radius: 10px
</style>
