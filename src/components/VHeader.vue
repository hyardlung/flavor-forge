<template>
  <q-header>
    <div class="row justify-center">
      <div class="col-12">
        <q-toolbar class="q-px-lg q-py-md">
          <router-link to="/">
            <q-img src="src/assets/logo.svg"
                   fit="contain"
                   class="logo" />
          </router-link>
          <q-space />
          <q-btn-toggle v-model="model"
                        flat
                        stretch
                        toggle-color="yellow"
                        :options="links"
                        class="gt-xs" />
          <q-btn flat
                 dense
                 round
                 icon="menu"
                 aria-label="Menu"
                 @click="openMenu"
                 class="xs" />
        </q-toolbar>
      </div>
    </div>
  </q-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue'
import { HeaderLink } from '../data/models';

const emit = defineEmits<{
  (e: 'toggleMenu'): void
}>()

const links: Ref<HeaderLink[]> = ref([
  { label: 'Recipes', value: 'recipes', to: '/recipes' },
]);

const model: Ref<string> = ref('/')

function openMenu() {
  emit('toggleMenu')
}
</script>

<style lang="sass">
.logo
  width: 282px
  height: 45px
  @media screen and (max-width: 599px)
    width: 200px
</style>
