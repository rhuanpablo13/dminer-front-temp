import { ref } from 'vue'
import { fetchAll, fetchCreate, fetchUpdate, fetchDelete, fetchSearch,fetchDropdown, fetchFind, fetchSearchItem} from '@/api/request.js'
import { fetchQuizAnswer } from '@/api/survey.js'
import { fetchSearchAll } from '@/api/feed.js'
import { fetchAllFavorites, fetchCreateFavorite } from '@/api/favorite'
import { dateFormartUs } from '@/util/date.js'

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

  const getDropdown = async (URL, hasBoolean) => {
    return await fetchDropdown(URL, hasBoolean)
  }

  const updateCount = async (idQuiz, item , login) => {
    return  fetchQuizAnswer(idQuiz, item, login)
  }

  const searchAll = async (data) => {
    const date = data.date ? dateFormartUs(data.date) : ''
    getListItem.value =  await fetchSearchAll(date, data.user)
  }  
  
  const getFavorites = async (login) => {
    getListItem.value =  await fetchAllFavorites(login)
  }

  const favorite = async (item) => {
    return await fetchCreateFavorite(item)
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
    getFavorites,
    favorite
  }
}
