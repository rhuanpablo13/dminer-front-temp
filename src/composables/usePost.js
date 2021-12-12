import { ref, onMounted } from 'vue'
import { dateHourFormarUs } from '@/util/date'
import {
  fetchUpdate,
  fetchCreateComment,
  fetchPost,
  fetchSearch
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

  const search = async (data) => {
    getPost.value =  await fetchSearch(data.id, dateHourFormarUs(data.date), data.user)
  }


  return {
    update,
    crateComment,
    setPost,
    getPost,
    search
  }
}
