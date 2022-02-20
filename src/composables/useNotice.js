import { ref, onMounted } from 'vue'
import { fetchAll, fetchCreate, fetchUpdate, fetchDelete } from '@/api/notice.js'

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

  const deleteItem = async (id) => {
    return await fetchDelete(id)
  }

  return {
    getNotices,
    setNotice,
    create,
    update,
    deleteItem
  }
}
