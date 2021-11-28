import { ref, onMounted } from 'vue'
import { fetchAll, fetchCreate } from '@/api/permission.js'

export default function usePermission() {
  const getPermission = ref([])

  const setPermission = async () => {
    getPermission.value = await fetchAll()
  }

  const create = async (item) => {
    return await fetchCreate(item)
  }

  onMounted(setPermission)

  return {
    getPermission,
    setPermission,
    create
  }
}
