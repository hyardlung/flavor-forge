<template>
  <div class="row q-py-lg justify-center hero">
    <div class="col-10">
      <div class="row q-pa-lg justify-between">
        <div class="col-5">
          <h1 class="text-h2">{{ store.recipe.title }}</h1>
          <div class="divider hero__divider"></div>

          <div class="hero__diets">
            <div v-for="diet in store.recipe.diets"
                 :key="diet"
                 class="hero__diet">
              {{ diet }}
            </div>
          </div>

          <q-btn padding="15px 40px"
                 color="accent"
                 text-color="secondary"
                 label="Read now"
                 unelevated
                 class="hero__btn" />
        </div>
        <div class="col-6">
          <q-img :src="store.recipe.image"
                 spinner-color="secondary"
                 spinner-size="82px"
                 :ratio="16 / 10"
                 img-class="hero__img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue';
import { useStore } from '../stores/store'

const store = useStore()

onMounted(() => {
  // startPolling()
  store.getRandomRecipe()
})

function startPolling() {
  setInterval(() => {
    store.getRandomRecipe();
  }, 5000);
}
</script>

<style lang="sass">
.hero__img
  border-radius: 80px
</style>

<style lang="sass" scoped>
.hero
  color: #fff
  background: $primary

  &__divider
    margin-bottom: 20px

  &__diets
    display: flex
    gap: 20px
    margin-bottom: 40px

  &__diet
    padding: 5px 20px
    font-size: 22px
    line-height: 26px
    color: $secondary
    border: 1px solid $secondary
    border-radius: 15px

  &__btn
    border-radius: 15px

.divider
  width: 100%
  height: 3px
  border-radius: 3px
  background: $secondary
</style>
