import { fetchSearch } from '@/api/search.js'

export default function useSearch() {
  const getSearch = async (text) => {
    return await fetchSearch(text)
  }

  return {
    getSearch
  }
}
