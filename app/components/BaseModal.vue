<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void
}>()

function close() {
  emit("update:modelValue", false)
}
</script>

<template>

<Teleport to="body">

<transition name="fade">

<div
v-if="modelValue"
class="fixed inset-0 z-50 flex items-center justify-center"
>

<!-- overlay -->
<div
class="absolute inset-0 bg-black/40 backdrop-blur-sm"
@click="close"
></div>

<!-- modal -->
<div
class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10 animate-scale"
>

<!-- SLOT HEADER -->
<div class="mb-4">
<slot name="header"/>
</div>

<!-- SLOT CONTENT -->
<div class="mb-4">
<slot/>
</div>

<!-- SLOT FOOTER -->
<div>
<slot name="footer"/>
</div>

</div>

</div>

</transition>

</Teleport>

</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes scale {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-scale {
  animation: scale 0.2s ease;
}
</style>