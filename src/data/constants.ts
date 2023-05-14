import { ref } from 'vue';
import type { Ref } from 'vue';

import { mealType } from './models';

import { laHamburgerSolid, laGlassMartiniSolid, laCookieBiteSolid,
  laBaconSolid, laBreadSliceSolid, laMugHotSolid, laHotdogSolid,
  laCarrotSolid, laPepperHotSolid, laDrumstickBiteSolid,
  laAppleAltSolid, laPizzaSliceSolid, laLemon, laGlassWhiskeySolid } from '@quasar/extras/line-awesome'

export const mealTypes: Ref<mealType[]> = ref([
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

export const diets: Ref<string[]> = ref([
  'Gluten Free', 'Ketogenic', 'Vegetarian',
  'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan',
  'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30'
]);
