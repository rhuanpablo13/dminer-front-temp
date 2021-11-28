import { ref, onMounted } from 'vue'
import { fetchAll, fetchCreate, fetchUpdate } from '@/api/notice.js'

export default function useNotice() {
  const getNotices = ref([])

  const setNotice = async () => {
    getNotices.value = await fetchAll()
  }

  const create = async (item) => {
    return await fetchCreate(item)
  }

  const update = async (item) => {
    return await fetchUpdate(item)
  }

  return {
    getNotices,
    setNotice,
    create,
    update
  }
}
