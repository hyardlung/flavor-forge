import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';
import { Recipe, mealType } from 'src/components/models';
import { laHamburgerSolid, laGlassMartiniSolid, laCookieBiteSolid, laBaconSolid, laBreadSliceSolid, laMugHotSolid, laCarrotSolid, laPepperHotSolid, laDrumstickBiteSolid, laAppleAltSolid, laPizzaSliceSolid } from '@quasar/extras/line-awesome'

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
  ])

  async function getRandomRecipe() {
    const resp = await axios.get(`${baseURL.value}/recipes/random?apiKey=${apiKey.value}`)
    recipe.value = resp.data.recipes[0]
  }

  return { apiKey, recipe, mealTypes, getRandomRecipe }
});
