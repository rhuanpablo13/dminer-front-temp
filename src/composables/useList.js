import { ref } from 'vue'
import { fetchAll, fetchCreate, fetchUpdate, fetchDelete, fetchSearch,fetchDropdown, fetchFind, fetchSearchItem} from '@/api/request.js'
import { fetchQuizAnswer } from '@/api/survey.js'
import { fetchSearchAll } from '@/api/feed.js'
import { fetchAllFavorites } from '@/api/favorite'

export default function useList() {
  const getListItem = ref([])

  const setList = async (URL) => {
    getListItem.value = await fetchAll(URL)
  }

  const getSearchItem = async (URL, keyword, login) => {
    return await fetchSearchItem(URL, keyword, login)
  }

  const create = async (URL, doc) => {
    return await fetchCreate(URL, doc)
  }

  const update = async (URL,item) => {
    return await fetchUpdate(URL,item)
  }

  const deleteItem = async (URL,id) => {
    return await fetchDelete(URL,id)
  } 
  
  const search = async (URL,keyword) => {
    getListItem.value = await fetchSearch(URL,keyword)
  }

  const getId = async (URL,id) => {
    getListItem.value = await fetchFind(URL,id)
  }

  const getDropdown = async (URL) => {
    return await fetchDropdown(URL)
  }

  const updateCount = async (idQuiz, item , login) => {
    return  fetchQuizAnswer(idQuiz, item, login)
  }

  const searchAll = async (data) => {
    getPostsAll.value =  await fetchSearchAll(dateHourFormarUs(data.date), data.user)
  }  
  
  const getFavorites = async (login) => {
    getPostsAll.value =  await fetchAllFavorites(login)
  }

  return {
    getListItem,
    setList,
    getSearchItem,
    create,
    update,
    deleteItem,
    search,
    getId,
    getDropdown,
    updateCount,
    searchAll,
    getFavorites
  }
}
