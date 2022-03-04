import { ref, onMounted } from 'vue'
import { fetchAllUser, fetcSearch } from '@/api/user'

export default function useAllUsers() {
  const getAllUsers = ref([])

  const setAllUsers = async () => {
    const user = JSON.parse(sessionStorage.user)
    getAllUsers.value = await fetchAllUser(user.baererAuthentication)
  }

  const search = async (keyword) => {
    getAllUsers.value = await fetcSearch(keyword)
  }

  onMounted(setAllUsers)
  return {
    setAllUsers,
    getAllUsers,
    search
  }
}
