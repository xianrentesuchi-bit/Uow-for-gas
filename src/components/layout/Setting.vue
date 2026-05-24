<template>
  <div class="setting-container">
    <div class="setting-header">
      <h2>設定</h2>
      <button @click="$emit('close')">×</button>
    </div>
    <div class="setting-body">
      <!-- ここに設定コンテンツを記述 -->
      <p>設定項目がここに入ります。</p>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close']);
</script>

<style scoped>
.setting-container {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}
.setting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
