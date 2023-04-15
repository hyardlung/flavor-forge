<template>
  <div v-if="type.icon"
       class="button-wrapper">
    <q-btn padding="20px"
           class="type-button"
           unelevated
           @click="typeHandle(type.name)">
      <q-icon :name="type.icon" />
    </q-btn>
    <span>{{ type.name }}</span>
  </div>

  <q-btn v-else
         flat
         class="q-mx-auto"
         @click="typeHandle(type.name)">{{ type.name }}</q-btn>
</template>

<script setup lang="ts">
import { mealType } from './models'

const props = defineProps<{
  type: mealType
}>()

const emit = defineEmits<{
  (e: 'goToType', value: string): void
}>()

function typeHandle(value: string) {
  emit('goToType', value)
}

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
