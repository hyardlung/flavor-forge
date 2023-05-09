<template>
  <div class="row col-12 title-wrapper">
    <div :class="['col-auto', 'title', {'order-last': isMirrored}]">
      <h4 class="q-my-none title__pre-title">
        <slot name="pre-title" />
        <span><slot name="dymamic-part"/></span>
      </h4>
      <h1 class="q-my-none text-weight-semibold"><slot name="title" /></h1>
    </div>
    <div class="col-sm col-xs-12 self-end">
      <div class="divider title__divider"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isMirrored?: boolean
}>()
</script>

<style lang="sass" scoped>
.title-wrapper
  gap: 40px
  @media screen and (max-width: 599px)
    gap: 20px
.title
  color: $primary
  text-transform: uppercase

  &__divider
    margin-bottom: 50px
    background: $primary
    @media screen and (max-width: 1023px)
      margin-bottom: 32px
  h1
    font-size: 90px
    font-weight: 600
    @media screen and (max-width: 1023px)
      font-size: 64px
      line-height: 64px
  h4
    position: relative
    font-size: 45px
    @media screen and (max-width: 1023px)
      font-size: 32px
    span
      position: absolute
      top: -6px
      left: 60px
      font-size: 35px
      line-height: 60px
      color: $accent
      white-space: nowrap
      @media screen and (max-width: 1023px)
        top: -8px
        left: 46px
        font-size: 24px
</style>
