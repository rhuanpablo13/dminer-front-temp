import { ref, onMounted } from 'vue'
import { fetchAll, fetchQuizAnswer, fetchCreate, fetchUpdate, fetchDelete } from '@/api/quiz.js'

export default function useQuiz() {
  const getQuizs = ref([])

  const setQuiz = async (login) => {
   return await fetchAll(login)
  }

  const updateCount = async (idQuiz, item , login) => {
    return  fetchQuizAnswer(idQuiz, item, login)
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

  return {
    getQuizs,
    setQuiz,
    updateCount,
    create,
    deleteItem,
    update
  }
}
