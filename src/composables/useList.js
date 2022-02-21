import { ref } from 'vue'
import { fetchAll, fetchCreate, fetchUpdate, fetchDelete, fetchSearch,fetchDropdown, fetchFind } from '@/api/request.js'

export default function useList() {
  const getListItem = ref([])

  const setList = async (URL) => {
    getListItem.value = await fetchAll(URL)
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

  return {
    getListItem,
    setList,
    create,
    update,
    deleteItem,
    search,
    getId,
    getDropdown
  }
}
