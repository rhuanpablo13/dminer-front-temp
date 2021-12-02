import { ref, onMounted } from 'vue'
import { fetchAll, fetchQuizAnswer, fetchCreate } from '@/api/quiz.js'
import { useStore } from 'vuex'

export default function useQuiz() {
  const store = useStore()
  const getQuizs = ref([])

  const setQuiz = async () => {
    getQuizs.value = await fetchAll()
  }

  const updateCount = async (idQuiz, item) => {
    getQuizs.value = await fetchQuizAnswer(idQuiz, item, store.state.user.login)
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
