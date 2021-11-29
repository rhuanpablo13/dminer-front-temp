import { ref, onMounted } from 'vue'
import { fetchAll, fetchCreate, fetchUpdate } from '@/api/tutorial.js'

export default function useTutorial() {
  const getTutorials = ref([])

  const setTutorial = async () => {
    getTutorials.value = await fetchAll()
  }

  const create = async (item) => {
    return await fetchCreate(item)
  }

  const update = async (item) => {
    debugger
    return await fetchUpdate(item)
  }

  onMounted(setTutorial)

  return {
    getTutorials,
    setTutorial,
    create,
    update
  }
}
