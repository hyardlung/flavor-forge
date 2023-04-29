<template>
  <div class="q-mb-lg step">
    <div class="row">
      <div class="col-7 title-wrapper">
        <div class="row items-center q-col-gutter-lg">
          <div class="col-auto">
            <h3 class="q-my-none text-h5 text-weight-semibold text-uppercase title">{{`0${step.number} step`}}</h3>
          </div>
          <div class="col">
            <div class="divider title__divider"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-7">
        <p class="step__text">{{ step.step }}</p>
      </div>
      <!-- <div v-if="step.equipment.length" class="col-4">
        <div v-for="(q, i) in step.equipment" :key="i" class="step__equip">
          <q-img
            :src="`https://spoonacular.com/cdn/equipment_100x100/${q.image}`"
            :ratio="4/4"
            spinner-color="primary"
            spinner-size="20px"
            class="step__equip-img"
          />
          <span class="step__equip-name">{{ q.name }}</span>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { InstructionStep } from './models';

defineProps<{
  step: InstructionStep;
}>()
</script>

<style scoped lang="sass">
.title-wrapper
  height: 40px

.title
  color: $primary

  &__divider
    background: $primary

.step
  &__text
    font-size: 20px

  &__equip
    display: flex
    align-items: center
    flex-direction: column
    gap: 12px
    max-width: 120px

  &__equip-img
    width: 60px
    height: 60px
    border-radius: 6px
    overflow: hidden
    filter: drop-shadow(0px 3px 5px rgba(0, 30, 47, 0.1))

  &__equip-name
    font-size: 16px
</style>
