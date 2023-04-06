import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { Recipe } from 'src/components/models';



export const useStore = defineStore('store', () => {
  const apiKey = ref(process.env.apiKey || '')
  const baseURL = ref('https://api.spoonacular.com')
  const recipe = ref<Recipe>({
    id: 0,
    image: '',
    title: '',
    summary: '',
    diets: []
  })

  async function getRandomRecipe() {
    const resp = await axios.get(`${baseURL.value}/recipes/random?apiKey=${apiKey.value}`)
    recipe.value = resp.data.recipes[0]
  }

  return { apiKey, recipe, getRandomRecipe }
});
