import { fetchAll, fetchCreate } from '@/api/notification.js'

export default function useNotification() {
  const create = async (item) => {
    return await fetchCreate(item)
  }

  return {
    create
  }
}
