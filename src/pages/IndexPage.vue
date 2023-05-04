<template>
  <q-page>
    <hero-component :recipe="store.recipe" />
    <my-kitchen />
    <in-diet />
  </q-page>
</template>

<script setup lang="ts">
import { useStore } from 'src/stores/store';
const store = useStore();

import HeroComponent from 'components/HeroComponent.vue';
import MyKitchen from 'src/components/MyKitchen.vue';
import InDiet from 'src/components/InDiet.vue';

</script>
