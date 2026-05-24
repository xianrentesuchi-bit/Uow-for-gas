<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import Layout from '../components/layout/Layout.vue'
import VideoGrid from '../components/video/VideoGrid.vue'
import Loading from '../components/layout/Loading.vue'

import { searchVideos } from '../api/invidious'

const route = useRoute()
const videos = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const q = route.query.search_query as string
    videos.value = await searchVideos(q)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <Layout>
    <Loading v-if="loading" />

    <VideoGrid
      v-else
      :videos="videos"
    />
  </Layout>
</template>
