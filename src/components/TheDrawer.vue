<script setup>
defineProps({
  isVisible: Boolean
})

defineEmits(['on-close'])
</script>

<template>
  <transition name="fade">
    <div 
      v-if="isVisible"
      class="the-drawer__background" 
      @click="$emit('on-close')"
    />
  </transition>
  <transition name="slide-x">
    <div
      v-show="isVisible" 
      class="the-drawer" 
    >
      <a 
        href="#"
        @click.prevent="$emit('on-close')"
        class="the-drawer__btn"
      >
        <img 
          src="/images/icn-close.svg" 
          alt="close"
          class="the-drawer__icn"
        >
      </a>
      <slot />
    </div>
  </transition>
</template>

<style>
.the-drawer__background {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0, 0.5);
  z-index: 50;
}

.the-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 640px;
  height: 100vh;
  background-color: white;
  z-index: 60;
}

.the-drawer__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--size-xxl);
  height: var(--size-xxl);
  background-color: var(--color-grey);
}

.the-drawer__icn {
  width: var(--size-xl);
  height: var(--size-xl);
}
</style>