import { ref, onMounted } from 'vue'
import { fetchAllUser } from '@/api/user'

export default function useAllUsers() {
  const getAllUsers = ref([])

  const setAllUsers = async () => {
    const user = JSON.parse(localStorage.user)
    getAllUsers.value = await fetchAllUser(user.baererAuthentication)
  }

  onMounted(setAllUsers)
  return {
    setAllUsers,
    getAllUsers
  }
}
