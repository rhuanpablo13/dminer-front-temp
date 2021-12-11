import { ref, onMounted } from 'vue'
import {
  fetchUpdate,
  fetchCreateComment,
  fetchPost,
} from '@/api/feed.js'

export default function usePost() {
  const getPost = ref([])

  const crateComment = async (item) => {
    return await fetchCreateComment(item)
  }

  const update = async (item) => {
    return await fetchUpdate(item)
  }

  const setPost = async (id) => {
    getPost.value =  await fetchPost(id)
  }

  return {
    update,
    crateComment,
    setPost,
    getPost,
  }
}
