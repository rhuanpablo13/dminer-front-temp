import { ref, onMounted } from 'vue'
import {
  fetchAll,
  fetchCreate,
  fetchUpdate,
  fetchCreateComment,
  fetchPost,
  fetchAllPost
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

  const getPost = async (id) => {
    return await fetchPost(id)
  }

  const getAllPost = async () => {
    return await fetchAllPost()
  }


  return {
    getFeeds,
    setFeed,
    create,
    update,
    crateComment,
    getPost,
    getAllPost
  }
}
