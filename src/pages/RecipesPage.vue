<template>
  <q-page>
    <section class="row q-pa-lg justify-center">
      <div class="column col-md-10 col-xs-12">
        <div class="row">
          <custom-title>
            <template #title>Recipes</template>
          </custom-title>
        </div>
        <q-form
          @submit="store.searchSubmit"
          @reset="store.searchReset"
          class="column q-gutter-md q-mt-lg"
        >
          <div class="row q-col-gutter-md">
            <div class="col-auto">
              <q-select
                filled
                transition-show="jump-up"
                transition-hide="jump-down"
                v-model="store.selectedType"
                :options="types"
                options-dense
                dense
                label="Meal type"
                label-color="primary"
                style="width: 250px"
              />
            </div>

            <div class="col-auto">
              <q-select
                filled
                transition-show="jump-up"
                transition-hide="jump-down"
                v-model="store.selectedDiet"
                :options="store.diets"
                options-dense
                dense
                label="Diet"
                label-color="primary"
                style="width: 250px"
              />
            </div>

            <div class="col gt-sm">
              <q-input
                filled
                dense
                label="Search"
                label-color="primary"
                v-model="store.searchField"
              >
                <template v-slot:append>
                  <q-icon name="search" color="primary" />
                </template>
              </q-input>
            </div>

          </div>
          <div class="row lt-md q-col-gutter-md q-mt-md" style="max-width: 532px">
            <div class="col">
              <q-input
                filled
                dense
                label="Search"
                label-color="primary"
                v-model="store.searchField"
              >
                <template v-slot:append>
                  <q-icon name="search" color="primary" />
                </template>
                </q-input>
            </div>

          </div>
          <div class="row q-col-gutter-md q-mt-md">
            <div class="col-auto">
              <q-range
              name="price_range"
              v-model="store.proteinRange"
              label
              dense
              style="width: 250px"
              />
              <p style="color: #767676">Protein (grams per serving)</p>
            </div>

            <div class="col-auto">
              <q-range
              name="price_range"
              v-model="store.carbohydratesRange"
              label
              dense
              style="width: 250px"
              />
              <p style="color: #767676">Carbohydrates (grams per serving)</p>
            </div>
          </div>
          <div class="row q-col-gutter-md q-mt-md">
            <div class="col-auto">
              <q-btn label="Search" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" outline class="q-ml-sm" />
            </div>
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

        <div class="row q-mt-lg q-gutter-lg card-wrapper">
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
import { ref, computed, onBeforeMount } from 'vue';
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
  margin-top: 50px
  width: 100%
  display: grid
  grid-template-columns: repeat(3, 1fr)
  @media screen and (max-width: 1023px)
    margin-top: 20px
    grid-template-columns: repeat(2, 1fr)
  @media screen and (max-width: 599px)
    margin-top: 0
    grid-template-columns: repeat(1, 1fr)
</style>
