import { ref, onMounted } from 'vue'
import { fetchAll, fetchCreate, fetchUpdate } from '@/api/document.js'

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

  return {
    getDocuments,
    setDocument,
    create,
    update
  }
}
