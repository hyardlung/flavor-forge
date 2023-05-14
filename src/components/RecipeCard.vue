<template>
  <router-link :to="`recipes/${recipe.id}`"
               @click="goToRecipe(recipe.id)">
    <q-card class="card">
      <q-img :src="recipe.image"
             :ratio="store.isXSRes ? 20 / 10 : null">
        <div class="absolute-bottom ">
          {{ recipe.title }}
        </div>
      </q-img>
    </q-card>
  </router-link>
</template>

<script setup lang="ts">
import { findedRecipe } from '../data/models';
import { useStore } from 'src/stores/store';

const store = useStore();
const props = defineProps<{
  recipe: findedRecipe;
}>()

const emit = defineEmits<{
  (e: 'cardClick', value: number): void;
}>();

function goToRecipe(id: number) {
  emit('cardClick', id);
};
</script>

<style lang="sass" scoped>
.card
  border-radius: 10px
  cursor: pointer
</style>
