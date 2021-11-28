import { ref, onMounted } from 'vue'
import { fetchAll, fetchCreate } from '@/api/reminder.js'

export default function useReminder() {
  const getReminders = ref([])

  const setReminder = async () => {
    getReminders.value = await fetchAll()
  }

  const create = async (item) => {
    return await fetchCreate(item)
  }

  return {
    getReminders,
    setReminder,
    create
  }
}
