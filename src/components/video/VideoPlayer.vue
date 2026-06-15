<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  id: string
  stream?: string
  formatStreams?: any[]
}>()

const videoRef = ref<HTMLVideoElement | null>(null)

const selectedVideo = computed(() => {
  if (!props.formatStreams?.length) {
    return null
  }

  return (
    props.formatStreams.find(
      (stream) =>
        stream.qualityLabel === '720p'
    ) ||
    props.formatStreams.find(
      (stream) =>
        stream.qualityLabel === '480p'
    ) ||
    props.formatStreams[0]
  )
})

watch(
  () => props.stream,
  async () => {
    if (
      props.stream === 'stream' &&
      videoRef.value
    ) {
      videoRef.value.load()

      try {
        await videoRef.value.play()
      } catch {}
    }
  }
)

// 現在のブラウザURLから末尾のIDを取得する関数
const getUrlId = () => {
  if (typeof window !== 'undefined') {
    const parts = window.location.href.split('/')
    return parts[parts.length - 1] || props.id
  }
  return props.id
}
</script>

<template>
  <div
    class="w-full aspect-video rounded-2xl border border-zinc-200 overflow-hidden bg-black"
  >
    <video
      v-if="
        selectedVideo &&
        stream === 'stream'
      "
      ref="videoRef"
      class="w-full h-full"
      controls
      autoplay
      playsinline
    >
      <source
        :src="selectedVideo.url"
        :type="selectedVideo.type"
      >
    </video>

    <iframe
      v-else
      :key="`${stream}-${id}`"
      class="w-full h-full"
      :src="
        stream === 'youtube'
          ? `https://www.youtube.com/embed/${id}`
          : `https://www.youtube-nocookie.com/embed/${getUrlId()}`
      "
      allowfullscreen
    />
  </div>
</template>
