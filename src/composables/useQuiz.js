import { ref, onMounted } from 'vue'
import { fetchAll, fetchQuizAnswer, fetchCreate } from '@/api/quiz.js'

export default function useQuiz() {
  const getQuizs = ref([])

  const setQuiz = async () => {
    getQuizs.value = await fetchAll()
  }

  const updateCount = async (idQuiz, item, login) => {
    getQuizs.value = await fetchQuizAnswer(idQuiz, item, login)
  }

  const create = async (item) => {
    return await fetchCreate(item)
  }

  return {
    getQuizs,
    setQuiz,
    updateCount,
    create
  }
}
