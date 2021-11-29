import { ref, onMounted } from 'vue'
import {
  fetchAll,
  fetchCreate,
  fetchUpdate,
  fetchCreateComment
} from '@/api/feed.js'

export default function useFeed() {
  const getFeeds = ref([])

  const setFeed = async () => {
    getFeeds.value = await fetchAll()
  }

  const create = async (item) => {
    return await fetchCreate(item)
  }

  const crateComment = async (item) => {
    return await fetchCreateComment(item)
  }

  const update = async (item) => {
    return await fetchUpdate(item)
  }

  return {
    getFeeds,
    setFeed,
    create,
    update,
    crateComment
  }
}
