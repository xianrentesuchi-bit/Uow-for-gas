import axios from 'axios'

const instances = [
  'https://inv.nadeko.net/',
  'https://invidious.f5.si/',
  'https://invidious.ritoge.com/',
  'https://invidious.ducks.party/',
  'https://super8.absturztau.be/',
  'https://invidious.darkness.services/',
  'https://yt.omada.cafe/',
  'https://iv.melmac.space/',
  'https://iv.duti.dev/',
]

async function request(path: string) {
  for (const instance of instances) {
    try {
      const res = await axios.get(`${instance}${path}`)
      return res.data
    } catch (e) {
      console.log('instance failed', instance)
    }
  }

  throw new Error('all instances failed')
}

export async function searchVideos(query: string) {
  return request(`/api/v1/search?q=${encodeURIComponent(query)}&type=video`)
}

export async function trendingVideos() {
  return request('/api/v1/trending')
}

export async function getVideo(id: string) {
  return request(`/api/v1/videos/${id}`)
}

export async function getComments(id: string) {
  return request(`/api/v1/comments/${id}`)
}
