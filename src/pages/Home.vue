<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Layout from '../components/layout/Layout.vue'
import VideoGrid from '../components/video/VideoGrid.vue'
import { trendingVideos } from '../api/invidious'

const videos = ref<any[]>([])

onMounted(async () => {
  videos.value = await trendingVideos()
})
</script>

<template>
  <Layout>
    <VideoGrid :videos="videos" />
  </Layout>
</template>
