<template>
  <div class="row col-12 q-col-gutter-md q-pr-md items-center recipe-card">
    <q-img :src="`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`"
           :ratio="4 / 4"
           width="70px"
           spinner-color="primary"
           spinner-size="40px"
           class="col-auto" />
    <p class="text-h5">{{ ingredient.name }}</p>
    <p class="q-ml-auto">
      <span class="text-h6 q-mr-sm">{{ ingredient.amount }}</span>
      <span class="text-h6">{{ ingredient.unit }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { Ingredient } from '../data/models'

defineProps<{
  ingredient: Ingredient
}>()
</script>

<style lang="sass" scoped>
.recipe-card
  background-color: #FFFEF6
  border-radius: 10px
  overflow: hidden
  filter: drop-shadow(0px 3px 5px rgba(0, 30, 47, 0.1))
</style>
