import { ref, onMounted } from 'vue'
import { fetchAllFeed } from '@/api/feed.js'

export default function useFeed() {
  const getFeeds = ref([])

  const setFeed = async () => {
    getFeeds.value = await fetchAllFeed()
  }

  return {
    getFeeds,
    setFeed
  }
}
