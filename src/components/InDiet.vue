<template>
  <section class="row q-py-lg justify-center">
    <div class="col-10">
      <div class="row q-pa-lg q-mb-sm">
        <custom-title>
          <template #pre-title>In </template>
        <template #dymamic-part>{{ store.currentDiet }}</template>
          <template #title>Diet</template>
        </custom-title>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'src/stores/store';
import CustomTitle from './CustomTitle.vue';

const store = useStore();
onMounted(() => {
  getNextDiet()
})

const getNextDiet = () => {
  store.currentDiet = store.diets[0]
  let index = 1;
  const intervalId = setInterval(() => {
    store.currentDiet = store.diets[index];
    index = (index + 1) % store.diets.length;
  }, 5000);

  return () => {
    clearInterval(intervalId);
  };
};
</script>

<style lang="sass" scoped>
</style>
