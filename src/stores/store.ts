import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { makeRequest } from './../api/index'

import { Recipe, RecipeInformation, findedRecipe, mealType, Ingredient, Nutrient, InstructionStep, Pagination, NutrientsRange } from 'src/components/models';
import { laHamburgerSolid, laGlassMartiniSolid, laCookieBiteSolid,
  laBaconSolid, laBreadSliceSolid, laMugHotSolid, laHotdogSolid,
  laCarrotSolid, laPepperHotSolid, laDrumstickBiteSolid,
  laAppleAltSolid, laPizzaSliceSolid, laLemon, laGlassWhiskeySolid } from '@quasar/extras/line-awesome'

export const useStore = defineStore('store', () => {
  const searchLoading = ref(false);
  const currentDiet = ref('');

  const selectedType = ref();
  const selectedDiet = ref();
  const searchField = ref();

  const recipe = ref<Recipe>({
    id: 0,
    image: '',
    title: '',
    summary: '',
    diets: []
  });

  const ingredient = ref<Ingredient>({
    id: 0,
    name: '',
    image: '',
    amount: 0,
    unit: ''
  })

  const recipeInformation = ref<RecipeInformation>({
    id: 0,
    title: '',
    image: '',
    summary: '',
    dishTypes: [],
    diets: [],
    extendedIngredients: [],
    servings: 0,
    readyInMinutes: 0,
    preparationMinutes: 0
  });

  const recipeInstruction: Ref<InstructionStep[]> = ref([]);
  const nutrients: Ref<Nutrient[]> = ref([]);

  const proteinRange = ref<NutrientsRange>({
    min: 10,
    max: 40
  });
  const carbohydratesRange = ref<NutrientsRange>({
    min: 5,
    max: 30
  });

  const findedRecipes: Ref<findedRecipe[]> = ref([]);
  const findedRecipesByDiet: Ref<findedRecipe[]> = ref ([])

  const mealTypes: Ref<mealType[]> = ref([
    { name: 'Main course', icon: laHamburgerSolid },
    { name: 'Side dish', icon: laDrumstickBiteSolid },
    { name: 'Dessert', icon: laCookieBiteSolid },
    { name: 'Appetizer', icon: laPizzaSliceSolid },
    { name: 'Salad', icon: laCarrotSolid },
    { name: 'Bread', icon: laBreadSliceSolid },
    { name: 'Breakfast', icon: laBaconSolid },
    { name: 'Sauce', icon: laPepperHotSolid },
    { name: 'Snack', icon: laAppleAltSolid },
    { name: 'Beverage', icon: laGlassMartiniSolid },
    { name: 'Drink', icon: laGlassWhiskeySolid },
    { name: 'Soup', icon: laMugHotSolid },
    { name: 'Fingerfood', icon: laHotdogSolid },
    { name: 'Marinade', icon: laLemon },
  ]);

  const diets: Ref<string[]> = ref([
    'Gluten Free', 'Ketogenic', 'Vegetarian',
    'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan',
    'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30'
  ]);

  const pagination = ref<Pagination>({
    currentPage: 1,
    perPage: 0,
    pages: 0
  })

  async function getRecipesByType(type: string) {
    searchLoading.value = true;
    try {
      const response = await makeRequest('/recipes/complexSearch', { type: type, number: 12 } );
      selectedType.value = type;
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
      const response = await makeRequest('/recipes/complexSearch', { diet: diet, number: 6 } );
      findedRecipesByDiet.value = response.results;
    } catch (err) {
      console.log(err);
    } finally {
      searchLoading.value = false;
    }
  };

  async function getRecipeDetails(id: number | string) {
    searchLoading.value = true;
    try {
      const response = await makeRequest(`/recipes/${id}/information`, { includeNutrition: true });
      recipeInformation.value = response;
      nutrients.value = response.nutrition.nutrients;
    } catch (err) {
      console.log(err)
    } finally {
      searchLoading.value = false;
    }
  };

  async function getRecipeInstruction(id: number | string) {
    searchLoading.value = true;
    try {
      const response = await makeRequest(`/recipes/${id}/analyzedInstructions`);
      recipeInstruction.value = response[0].steps;
    } catch (err) {
      console.log(err)
    } finally {
      searchLoading.value = false;
    }
  }

  async function searchSubmit(page: number) {
    searchLoading.value = true;
    try {
      const response = await makeRequest('/recipes/complexSearch', {
        type: selectedType.value || '',
        diet: selectedDiet.value || '',
        minProtein: proteinRange.value.min,
        maxProtein: proteinRange.value.max,
        minCarbs: proteinRange.value.min,
        maxCarbs: proteinRange.value.max,
        query: searchField.value || '',
        number: 12,
        offset: pagination.value.currentPage <= 1
          ? 0
          : (pagination.value.currentPage - 1) * pagination.value.perPage
      });
      findedRecipes.value = response.results;
      pagination.value = {
        currentPage: isNaN(page) ? 1 : page,
        perPage: 12,
        pages: response.totalResults / response.number
      }
    } catch (err) {
      console.log(err)
    } finally {
      searchLoading.value = false;
    }
  }

  function searchReset() {
    selectedType.value = '';
    selectedDiet.value = '';
    searchField.value = '';
  }

  async function getRandomRecipes() {
    searchLoading.value = true;
    try {
      const response = await makeRequest('/recipes/random', { number: 12 });
      findedRecipes.value = response.recipes;
      recipe.value = findedRecipes.value[0];
    } catch (err) {
      console.log(err)
    } finally {
      searchLoading.value = false;
    }
  }

  return {
    searchLoading, currentDiet, recipe, recipeInformation,
    findedRecipes, findedRecipesByDiet, mealTypes, diets,
    ingredient, nutrients, recipeInstruction, proteinRange, carbohydratesRange,
    selectedType, selectedDiet, searchField, pagination,
    getRandomRecipes, getRecipesByType, getRecipesByDiet,
    getRecipeDetails, getRecipeInstruction,
    searchSubmit, searchReset
  }
});
