import { ref, onMounted } from 'vue'
import { dateHourFormarUs } from '@/util/date'
import {
  fetchUpdate,
  fetchCreateComment,
  fetchPost,
  fetchSearch,
  fetchLike
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
    getPost.value =  await fetchSearch(data.id, data.date ? dateHourFormarUs(data.date) : data.date, data.user)
  }

  const setReact = async (id, login, _react) => {
    return await fetchLike(id, login, _react)
  }

  const setDropdownReact = async () => {
    return fetchDropdownReact()
  }

  return {
    update,
    crateComment,
    setPost,
    getPost,
    search,
    setReact,
    setDropdownReact
  }
}
