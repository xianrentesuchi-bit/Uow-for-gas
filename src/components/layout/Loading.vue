<script setup lang="ts">
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
</script>

<template>
  <div class="layout-container">
    <Header />
    <Sidebar />

    <main class="main-content">
      <div class="fixed inset-0 z-[9999] bg-[#f9f9f9] flex items-center justify-center">
        <div class="flex flex-col items-center">
          <div class="text-xl font-semibold text-zinc-900">
            動画読み込み中...
          </div>

          <div class="mt-2 text-zinc-500">
            動画検索やデータ取得をしています
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout-container {
  --sidebar-width: 240px;
}

.main-content {
  padding-top: 4rem;
  padding-left: var(--sidebar-width);
  transition: padding-left 0.3s ease;
}
</style>
