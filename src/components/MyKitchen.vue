<template>
  <section class="row q-py-lg justify-center">
    <div class="col-md-10 col-xs-12">
      <div class="row q-pa-lg q-mb-sm">
        <custom-title>
          <template #pre-title>In my</template>
          <template #title>Kitchen</template>
        </custom-title>
      </div>
      <div class="row row-wrap q-gutter-y-xl">
        <div v-for="item in mealTypes"
               :key="item.name" class="col-md-2 col-sm-3 col-xs-4">
          <type-button :type="item" @go-to-type="selectType"></type-button>
      </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CustomTitle from './CustomTitle.vue';
import TypeButton from './TypeButton.vue';
import { getRecipesByType } from 'src/api/service';
import { mealTypes } from 'src/data/constants';

function selectType(type: string) {
  getRecipesByType(type)
};
</script>
