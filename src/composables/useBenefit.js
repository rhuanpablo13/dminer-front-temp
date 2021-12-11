import { ref, onMounted } from 'vue'
import { fetchAll, fetchCreate, fetchUpdate, fetchDelete } from '@/api/benefit.js'

export default function useBenefit() {
  const getBenefits = ref([])

  const setBenefit = async () => {
    getBenefits.value = await fetchAll()
  }

  const create = async (item) => {
    return await fetchCreate(item)
  }

  const update = async (item) => {
    return await fetchUpdate(item)
  }

  const deleteItem = async (id) => {
    return await fetchDelete(id)
  }

  onMounted(setBenefit)

  return {
    getBenefits,
    setBenefit,
    create,
    update,
    deleteItem
  }
}
