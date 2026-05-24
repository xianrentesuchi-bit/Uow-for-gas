<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import Layout from '../components/layout/Layout.vue'
import Loading from '../components/layout/Loading.vue'
import ChannelVideoCard from '../components/ChannelVideoCard.vue'

import {
  getChannel,
  getChannelVideos
} from '../api/invidious'

const route = useRoute()

const channel = ref<any>(null)

const videos = ref<any[]>([])

const loading = ref(true)

onMounted(async () => {
  try {
    const id = route.params.id as string

    channel.value = await getChannel(id)

    videos.value = await getChannelVideos(id)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <Layout>

    <Loading v-if="loading" />

    <div
      v-else
      class="max-w-[1600px] mx-auto"
    >

      <div class="w-full h-48 md:h-72 bg-zinc-800 overflow-hidden">
        <img
          v-if="channel?.authorBanners?.[0]?.url"
          :src="channel.authorBanners[0].url"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="px-6 py-8">

        <div class="flex flex-col md:flex-row md:items-center gap-6">

          <img
            :src="channel?.authorThumbnails?.[0]?.url"
            class="w-28 h-28 rounded-full object-cover"
          />

          <div class="flex-1">

            <div class="text-3xl font-bold">
              {{ channel?.author }}
            </div>

            <div class="text-zinc-400 mt-2">
              @{{ channel?.author }}
            </div>

            <div class="text-zinc-400 mt-1">
              {{ channel?.subCount }} subscribers
            </div>

            <div class="mt-4 text-zinc-300 line-clamp-3">
              {{ channel?.description }}
            </div>

          </div>

          <button
            class="bg-white text-black px-6 h-11 rounded-full font-semibold"
          >
            Subscribe
          </button>

        </div>

        <div class="mt-10">

          <div class="text-2xl font-bold mb-6">
            Videos
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            <ChannelVideoCard
              v-for="video in videos"
              :key="video.videoId"
              :video="video"
            />

          </div>

        </div>

      </div>

    </div>

  </Layout>
</template>
