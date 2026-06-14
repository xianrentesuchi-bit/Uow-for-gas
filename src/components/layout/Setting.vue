<template>
  <div class="setting-container">
    <div class="setting-header">
      <h2>設定</h2>
      <button class="close-button" @click="$emit('close')">✕</button>
    </div>
    <div class="setting-body">
      <p class="setting-description">アプリケーションの各種動作環境を設定できます。</p>

      <div class="setting-section">
        <h3>カスタムエンドポイント</h3>

        <div class="input-group">
          <input
            v-model="customEndpoint"
            type="text"
            placeholder="https://example.com/api"
            class="setting-input"
          />

          <button
            class="save-button"
            @click="saveEndpoint"
          >
            保存
          </button>
        </div>

        <div
          v-if="savedEndpoints.length"
          class="saved-endpoints"
        >
          <h4>保存済みURL</h4>

          <div
            v-for="(url, index) in savedEndpoints"
            :key="index"
            class="saved-endpoint-item"
          >
            <span class="saved-endpoint-text">
              {{ url }}
            </span>

            <div class="saved-endpoint-actions">
              <button
                class="use-button"
                @click="useEndpoint(url)"
              >
                使用
              </button>

              <button
                class="delete-button"
                @click="deleteEndpoint(index)"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="setting-section">
        <h3>使用モード</h3>

        <div class="radio-group">
          <label class="checkbox-label" :class="{ active: endpointMode === 'default' }">
            <input
              type="radio"
              value="default"
              v-model="endpointMode"
            />
            <div class="radio-content">
              <span class="radio-title">既存APIのみ使用</span>
            </div>
          </label>

          <label class="checkbox-label" :class="{ active: endpointMode === 'custom' }">
            <input
              type="radio"
              value="custom"
              v-model="endpointMode"
            />
            <div class="radio-content">
              <span class="radio-title">カスタムエンドポイントのみ使用</span>
            </div>
          </label>

          <label class="checkbox-label" :class="{ active: endpointMode === 'rotation' }">
            <input
              type="radio"
              value="rotation"
              v-model="endpointMode"
            />
            <div class="radio-content">
              <span class="radio-title">ローテーションして使用</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

defineEmits(['close'])

const customEndpoint = ref('')
const endpointMode = ref('default')
const savedEndpoints = ref([])

onMounted(() => {
  const savedEndpoint = localStorage.getItem('custom_endpoint')
  const savedMode = localStorage.getItem('endpoint_mode')
  const savedList = localStorage.getItem('custom_endpoint_list')

  if (savedEndpoint) {
    customEndpoint.value = savedEndpoint
  }

  if (savedMode) {
    endpointMode.value = savedMode
  }

  if (savedList) {
    savedEndpoints.value = JSON.parse(savedList)
  }
})

function saveEndpoint() {
  if (!customEndpoint.value) {
    return
  }

  localStorage.setItem(
    'custom_endpoint',
    customEndpoint.value
  )

  if (
    !savedEndpoints.value.includes(
      customEndpoint.value
    )
  ) {
    savedEndpoints.value.push(
      customEndpoint.value
    )

    localStorage.setItem(
      'custom_endpoint_list',
      JSON.stringify(savedEndpoints.value)
    )
  }
}

function useEndpoint(url) {
  customEndpoint.value = url

  localStorage.setItem(
    'custom_endpoint',
    url
  )
}

function deleteEndpoint(index) {
  savedEndpoints.value.splice(index, 1)

  localStorage.setItem(
    'custom_endpoint_list',
    JSON.stringify(savedEndpoints.value)
  )

  if (
    customEndpoint.value ===
    savedEndpoints.value[index]
  ) {
    customEndpoint.value = ''
    localStorage.removeItem('custom_endpoint')
  }
}

watch(endpointMode, (value) => {
  localStorage.setItem('endpoint_mode', value)
})
</script>

<style scoped>
.setting-container {
  padding: 24px;
  height: 100%;
  overflow-y: auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #0f0f0f;
  background-color: #ffffff;
}

.setting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.setting-header h2 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.close-button {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: 50%;
  font-size: 16px;
  color: #606060;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, color 0.2s;
}

.close-button:hover {
  background-color: #f2f2f2;
  color: #0f0f0f;
}

.close-button:active {
  background-color: #e5e5e5;
}

.setting-description {
  font-size: 13px;
  color: #606060;
  margin: 0 0 24px 0;
}

.setting-section {
  margin-top: 32px;
}

.setting-section h3 {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 12px 0;
}

.input-group {
  display: flex;
  gap: 12px;
  align-items: center;
}

.setting-input {
  flex: 1;
  height: 40px;
  padding: 0 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  background-color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.setting-input:focus {
  border-color: #0556bf;
  box-shadow: inset 0 0 0 1px #0556bf;
}

.save-button {
  height: 40px;
  padding: 0 20px;
  border: none;
  border-radius: 20px;
  background-color: #0f0f0f;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-button:hover {
  background-color: #272727;
}

.save-button:active {
  transform: scale(0.98);
}

.saved-endpoints {
  margin-top: 20px;
  background-color: #f8f8f8;
  border-radius: 14px;
  padding: 16px;
}

.saved-endpoints h4 {
  font-size: 13px;
  font-weight: 600;
  color: #606060;
  margin: 0 0 8px 0;
}

.saved-endpoint-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 10px 14px;
  margin-top: 8px;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  transition: border-color 0.2s;
}

.saved-endpoint-item:hover {
  border-color: #ccc;
}

.saved-endpoint-text {
  font-size: 13px;
  color: #0f0f0f;
  word-break: break-all;
  flex: 1;
}

.saved-endpoint-actions {
  display: flex;
  gap: 6px;
}

.use-button, .delete-button {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  background-color: #ffffff;
  transition: background-color 0.2s, border-color 0.2s;
}

.use-button {
  color: #0556bf;
}

.use-button:hover {
  background-color: #f2f8ff;
  border-color: #cce2ff;
}

.delete-button {
  color: #cc0000;
}

.delete-button:hover {
  background-color: #fff5f5;
  border-color: #ffcccc;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.checkbox-label:hover {
  background-color: #f9f9f9;
  border-color: #ccc;
}

.checkbox-label.active {
  background-color: #f2f8ff;
  border-color: #0556bf;
}

.checkbox-label input[type="radio"] {
  margin: 0;
  width: 18px;
  height: 18px;
  accent-color: #0556bf;
  cursor: pointer;
}

.radio-content {
  display: flex;
  flex-direction: column;
}

.radio-title {
  font-size: 14px;
  font-weight: 500;
}
</style>
