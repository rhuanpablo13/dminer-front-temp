import { ref, onMounted } from 'vue'
import { fetchAll, fetchCreate } from '@/api/category.js'

export default function useCategory() {
  const getCategories = ref([])

  const setCategory = async () => {
    getCategories.value = await fetchAll()
  }

  const create = async (item) => {
    return await fetchCreate(item)
  }

  onMounted(setCategory)

  return {
    getCategories,
    setCategory,
    create
  }
}
