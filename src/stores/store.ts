import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { makeRequest } from './../api/index'

import { Recipe, findedRecipe, mealType } from 'src/components/models';
import { laHamburgerSolid, laGlassMartiniSolid, laCookieBiteSolid,
  laBaconSolid, laBreadSliceSolid, laMugHotSolid,
  laCarrotSolid, laPepperHotSolid, laDrumstickBiteSolid,
  laAppleAltSolid, laPizzaSliceSolid } from '@quasar/extras/line-awesome'

export const useStore = defineStore('store', () => {
  const searchLoading = ref(false);
  const currentDiet = ref('');
  const recipe = ref<Recipe>({
    id: 0,
    image: '',
    title: '',
    summary: '',
    diets: []
  });

  const findedRecipes: Ref<findedRecipe[]> = ref([
    {
      id: 0,
      title: '',
      image: '',
    }
  ]);

  const findedRecipesByDiet: Ref<findedRecipe[]> = ref ([
    {
      id: 0,
      title: '',
      image: '',
    }
  ])

  const mealTypes: Ref<mealType[]> = ref([
    { name: 'main course', icon: laHamburgerSolid },
    { name: 'side dish', icon: laDrumstickBiteSolid },
    { name: 'dessert', icon: laCookieBiteSolid },
    { name: 'appetizer', icon: laPizzaSliceSolid },
    { name: 'salad', icon: laCarrotSolid },
    { name: 'bread', icon: laBreadSliceSolid },
    { name: 'breakfast', icon: laBaconSolid },
    { name: 'sauce', icon: laPepperHotSolid },
    { name: 'snack', icon: laAppleAltSolid },
    { name: 'beverage', icon: laGlassMartiniSolid },
    { name: 'drink', icon: laMugHotSolid },
    { name: 'soup', icon: '' },
    { name: 'marinade', icon: '' },
    { name: 'fingerfood', icon: '' },
  ]);

  const diets: Ref<string[]> = ref([
    'Gluten Free', 'Ketogenic', 'Vegetarian',
    'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan',
    'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30'
  ]);

  async function getRecipesByType(type: string) {
    searchLoading.value = true;
    try {
      const response = await makeRequest('/recipes/complexSearch', { type: type } );
      findedRecipes.value = response.results;
    } catch (err) {
      console.log(err);
    } finally {
      searchLoading.value = false;
    }
  };

  async function getRecipesByDiet(diet: string) {
    searchLoading.value = true;
    try {
      const response = await makeRequest('/recipes/complexSearch', { diet: diet } );
      findedRecipesByDiet.value = response.results;
    } catch (err) {
      console.log(err);
    } finally {
      searchLoading.value = false;
    }
  }

  function getRandomRecipe() {
    // return api.get('/recipes/random');
  };

  return {
    searchLoading, currentDiet, recipe,
    findedRecipes, findedRecipesByDiet, mealTypes, diets,
    getRandomRecipe, getRecipesByType, getRecipesByDiet
  }
});
