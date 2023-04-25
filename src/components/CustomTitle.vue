<template>
  <div class="row col-12 title-wrapper">
    <div :class="['col-auto', 'title', {'order-last': isMirrored}]">
      <h4 class="q-my-none">
        <slot name="pre-title" />
        <span><slot name="dymamic-part"/></span>
      </h4>
      <h1 class="q-my-none text-weight-semibold"><slot name="title" /></h1>
    </div>
    <div class="col self-end">
      <div class="divider title__divider"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isMirrored?: boolean
}>()
</script>

<style lang="sass" scoped>
.title-wrapper
  gap: 40px
.title
  color: $primary
  text-transform: uppercase

  &__divider
    margin-bottom: 50px
    background: $primary
  h1
    font-size: 90px
    font-weight: 600
  h4
    position: relative
    font-size: 45px
    span
      position: absolute
      top: -6px
      left: 60px
      font-size: 35px
      line-height: 60px
      color: $accent
      white-space: nowrap
</style>
