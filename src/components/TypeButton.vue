<template>
  <div v-if="type.icon" class="button-wrapper">
    <q-btn padding="20px" class="type-button" unelevated>
      <q-icon :name="type.icon" />
    </q-btn>
    <span>{{ type.name }}</span>
  </div>

  <q-btn v-else flat class="q-mx-auto">{{ type.name }}</q-btn>
</template>

<script setup lang="ts">
import { mealType } from './models'

const props = defineProps<{
  type: mealType
}>()
</script>

<style lang="sass">
.button-wrapper
  display: flex
  flex-direction: column
  align-items: center
  row-gap: 15px

.type-button
  display: flex
  flex-direction: column
  border-radius: 15px
  background: $cream

  span
    color: $primary
</style>
