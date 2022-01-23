import { ref, onMounted } from 'vue'
import { dateHourFormarUs } from '@/util/date'
import {
  fetchAll,
  fetchCreate,
  fetchUpdate,
  fetchCreateComment,
  fetchPost,
  fetchAllPost,
  fetchSearchAll
} from '@/api/feed.js'

import { fetchAllFavorites, fetchCreateFavorite } from '@/api/favorite'

export default function useFeed() {
  const getFeeds = ref([])
  const getPostsAll = ref([])

  const setFeed = async () => {
    getFeeds.value = await fetchAll()
  }

  const create = async (item) => {
    return await fetchCreate(item)
  }

  const favorite = async (item) => {
    return await fetchCreateFavorite(item)
  }

  const crateComment = async (item) => {
    return await fetchCreateComment(item)
  }

  const update = async (item) => {
    return await fetchUpdate(item)
  }

  const setAllPost = async () => {
    getPostsAll.value =  await fetchAllPost()
  }

  const searchAll = async (data) => {
    getPostsAll.value =  await fetchSearchAll(dateHourFormarUs(data.date), data.user)
  }  
  
  const getFavorites = async (login) => {
    getPostsAll.value =  await fetchAllFavorites(login)
  }

  return {
    getFeeds,
    setFeed,
    create,
    update,
    crateComment,
    setAllPost,
    getPostsAll,
    searchAll,
    getFavorites,
    favorite
  }
}
