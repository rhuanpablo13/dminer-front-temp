import { fetchAll, fetchCreate, fetchUpdate, fetchDelete } from '@/api/notification.js'

export default function useNotification() {
  const create = async (item) => {
    return await fetchCreate(item)
  }
  const update = async (item) => {
    return await fetchUpdate(item)
  }

  const deleteItem = async (id) => {
    return await fetchDelete(id)
  }
  return {
    create,
    update,
    deleteItem
  }
}
