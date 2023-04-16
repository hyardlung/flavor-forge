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
import { ref } from 'vue';
import type { Ref } from 'vue';
import { findedRecipe } from './models';
const recipe: Ref<findedRecipe> = ref({
            id: 716429,
            title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
            image: 'https://spoonacular.com/recipeImages/716429-312x231.jpg',
})
</script>

<style lang="sass" scoped>
.card
  border-radius: 10px
</style>
