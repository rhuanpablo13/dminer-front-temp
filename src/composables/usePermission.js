import { ref, onMounted } from 'vue'
import { fetchDropdownPermissions, fetchCreate } from '@/api/permission.js'

export default function usePermission() {
  const getPermission = ref([])

  const setPermission = async () => {
    const user = JSON.parse(localStorage.user)
    getPermission.value = await fetchDropdownPermissions(user.baererAuthentication)
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
