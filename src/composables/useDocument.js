import { ref, onMounted } from 'vue'
import { fetchAll, fetchCreate, fetchUpdate, fetchDelete } from '@/api/document.js'

export default function useDocument() {
  const getDocuments = ref([])

  const setDocument = async () => {
    getDocuments.value = await fetchAll()
  }

  const create = async (doc) => {
    return await fetchCreate(doc)
  }

  const update = async (item) => {
    return await fetchUpdate(item)
  }

  const deleteItem = async (id) => {
    return await fetchDelete(id)
  }

  onMounted(setDocument)
  return {
    getDocuments,
    setDocument,
    create,
    update,
    deleteItem
  }
}
