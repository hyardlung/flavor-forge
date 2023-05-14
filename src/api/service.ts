import { storeToRefs } from 'pinia';
import { makeRequest } from './index';
import { useStore } from 'src/stores/store';

export async function getRandomRecipes() {
  const store = useStore();
  const { searchLoading, recipe, findedRecipes } = storeToRefs(store);
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
};

export async function getRecipesByType(type: string) {
  const store = useStore();
  const { searchLoading, selectedType, findedRecipes } = storeToRefs(store);
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

export async function getRecipesByDiet(diet: string) {
  const store = useStore();
  const { searchLoading, findedRecipesByDiet } = storeToRefs(store);
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

export async function getRecipeDetails(id: number | string) {
  const store = useStore();
  const { searchLoading, recipeInformation, nutrients } = storeToRefs(store);
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

export async function getRecipeInstruction(id: number | string) {
  const store = useStore();
  const { searchLoading, recipeInstruction } = storeToRefs(store);
  searchLoading.value = true;
  try {
    const response = await makeRequest(`/recipes/${id}/analyzedInstructions`);
    recipeInstruction.value = response[0].steps;
  } catch (err) {
    console.log(err)
  } finally {
    searchLoading.value = false;
  }
};

export async function searchSubmit(page: number) {
  const store = useStore();
  const { searchLoading, selectedType, selectedDiet, proteinRange, searchField, pagination, findedRecipes } = storeToRefs(store);
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
};
