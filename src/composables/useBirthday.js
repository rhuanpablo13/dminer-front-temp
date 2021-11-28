import { ref, onMounted } from 'vue'
import { fetchUsersBirthday } from '@/api/user.js'

export default function useBirthday() {
  const getBirthdays = ref([])

  const setBirthday = async () => {
    getBirthdays.value = await fetchUsersBirthday()
  }

  return {
    getBirthdays,
    setBirthday
  }
}
