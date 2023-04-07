<template>
  <section class="row q-py-lg justify-center hero">
    <div class="col-10">
      <div class="row q-pa-lg q-mb-sm">
        <custom-title>
          <template #pre-title>In my</template>
          <template #title>Kitchen</template>
        </custom-title>
      </div>
      <div class="row row-wrap q-gutter-y-xl">
        <div v-for="item in store.mealTypes"
               :key="item.name" class="col-2">
          <type-button :type="item"></type-button>
      </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useStore } from 'src/stores/store';
import CustomTitle from './CustomTitle.vue';
import TypeButton from './TypeButton.vue';

const store = useStore();
</script>

<style lang="sass">

</style>
