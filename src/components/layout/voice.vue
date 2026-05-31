<script setup lang="ts">
</script>

<template>
  <div class="fixed inset-0 z-[9999] flex items-end justify-center bg-black/40">
    <div class="w-full bg-white rounded-t-3xl px-6 py-10 animate-slideup flex flex-col items-center">
      <div class="text-zinc-500 text-lg mb-8">
        聞いています...
      </div>

      <div class="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
        <span class="material-symbols-outlined text-white text-[48px]">
          mic
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slideup {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.animate-slideup {
  animation: slideup 0.25s ease-out;
}

.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}
</style>
