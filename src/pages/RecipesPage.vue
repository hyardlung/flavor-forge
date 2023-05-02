<template>
  <q-page>
    <section class="row q-py-lg justify-center">
      <div class="column col-10">
        <div class="row">
          <custom-title>
            <template #title>Recipes</template>
          </custom-title>
        </div>
        <q-form
          @submit="store.searchSubmit"
          @reset="store.searchReset"
          class="row q-gutter-md q-mt-lg"
        >
          <div class="col row q-col-gutter-md">
            <q-select
              filled
              v-model="store.selectedType"
              :options="types"
              label="Meal type"
              label-color="primary"
              style="width: 250px"
            />

            <q-select
              filled
              v-model="store.selectedDiet"
              :options="store.diets"
              label="Diet"
              label-color="primary"
              style="width: 250px"
            />

            <q-input
              filled
              label="Search"
              label-color="primary"
              style="width: 250px"
              v-model="store.searchField"
            >
            <template v-slot:append>
              <q-icon name="search" color="primary" />
            </template>
            </q-input>
          </div>

          <div class="col-auto">
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>

        <div class="row q-mt-xl">
          <q-pagination
            boundary-numbers
            color="primary"
            :max="store.pagination.pages"
            :max-pages="6"
            v-model="store.pagination.currentPage"
            @update:model-value="goToPage"
          />
        </div>

        <div class="row q-mt-lg card-wrapper">
          <q-spinner-clock v-if="store.searchLoading || !store.findedRecipes" size="4em" color="primary" />
          <template v-else>
            <recipe-card v-for="recipe in store.findedRecipes" :key="recipe.id" :recipe="recipe"></recipe-card>
          </template>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useStore } from '../stores/store'
import { computed, onBeforeMount } from 'vue';
import CustomTitle from 'src/components/CustomTitle.vue';
import RecipeCard from 'src/components/RecipeCard.vue';

const store = useStore();

onBeforeMount(() => {
  if (!store.findedRecipes.length) store.getRandomRecipes()
})

const types = computed(() => {
  return _.map(store.mealTypes, 'name');
});

function goToPage(pageNumber: number) {
  store.searchSubmit(pageNumber);
};
</script>

<style lang="sass" scoped>
.card-wrapper
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 40px
</style>
