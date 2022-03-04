import { fetchSearch } from '@/api/search.js'

export default function useSearch() {
  const getSearch = async (text) => {
    const user = JSON.parse(sessionStorage.user)
    return await fetchSearch(text, user.login)
  }

  return {
    getSearch
  }
}
