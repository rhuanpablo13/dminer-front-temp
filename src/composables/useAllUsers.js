import { ref, onMounted } from 'vue'
import { fetchAllUser } from '@/api/user'

export default function useAllUsers() {
  const getAllUsers = ref([])

  const setAllUsers = async () => {
    getAllUsers.value = await fetchAllUser()
  }

  return {
    setAllUsers,
    getAllUsers
  }
}
