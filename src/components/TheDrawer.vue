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
      <button @click="$emit('on-close')">close</button>
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
</style>