import { defineStore } from 'pinia';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';

import { Recipe, RecipeInformation, findedRecipe, Ingredient, Nutrient, InstructionStep, Pagination, NutrientsRange } from 'src/data/models';
import { mealTypes, diets } from 'src/data/constants';

export const useStore = defineStore('store', () => {
  const searchLoading = ref(false);

  const currentDiet = ref('');
  const selectedDiet = ref();
  const selectedType = ref();
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
  const findedRecipesByDiet: Ref<findedRecipe[]> = ref ([]);

  const pagination = ref<Pagination>({
    currentPage: 1,
    perPage: 0,
    pages: 0
  });

  const isXSRes = ref(false);
  const isSMRes = ref(false);
  const isMDRes = ref(false);

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });

  function handleResize() {
    isXSRes.value = window.innerWidth < 600;
    isSMRes.value = window.innerWidth >= 600 && window.innerWidth < 1024;
    isMDRes.value = window.innerWidth >= 1024;
  };

  function searchReset() {
    selectedType.value = '';
    selectedDiet.value = '';
    searchField.value = '';
  };

  return {
    searchLoading, currentDiet, recipe, recipeInformation,
    findedRecipes, findedRecipesByDiet, mealTypes, diets,
    ingredient, nutrients, recipeInstruction, proteinRange, carbohydratesRange,
    selectedType, selectedDiet, searchField, pagination,
    isXSRes, isSMRes, isMDRes, searchReset
  }
});
