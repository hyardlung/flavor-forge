<template>
  <div v-if="type.icon"
       class="button-wrapper">
    <router-link to="/recipes"
                 @click="typeHandle(type.name)"
                 class="type-button">
      <q-icon :name="type.icon"
              size="md"
              color="primary" />
    </router-link>
    <span>{{ type.name }}</span>
  </div>

  <q-btn v-else
         flat
         class="q-mx-auto"
         @click="typeHandle(type.name)">{{ type.name }}</q-btn>
</template>

<script setup lang="ts">
import { mealType } from '../data/models'

defineProps<{
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
  align-items: center
  justify-content: center
  width: 75px
  height: 75px
  border-radius: 15px
  background: $cream

  span
    color: $primary
</style>
