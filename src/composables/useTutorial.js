import { ref, onMounted } from 'vue'
import { fetchAll, fetchCreate, fetchUpdate, fetchDelete } from '@/api/tutorial.js'

export default function useTutorial() {
  const getTutorials = ref([])

  const setTutorial = async () => {
    getTutorials.value = await fetchAll()
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

  onMounted(setTutorial)

  return {
    getTutorials,
    setTutorial,
    create,
    update,
    deleteItem
  }
}
