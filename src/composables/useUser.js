import { fetchAvatar, fetchBanner, fetchUpdateBanner } from '@/api/user'
import { getBase64 } from '@/util/convertBase64'

export default function useUser() {
  const getAvatar = async (id) => {
    const user = JSON.parse(localStorage.user)

    const file = await fetchAvatar(id)
    if (file) {
      const base64 = await getBase64(file)
      user.avatar = base64

      localStorage.user = JSON.stringify(user)
      return base64
    }
  }

  const getBanner = async (login) => {
    const user = JSON.parse(localStorage.user)

    const base64 = await fetchBanner(login)
    if (base64) {
      user.banner = base64

      localStorage.user = JSON.stringify(user)
      return base64
    }
  }

  const updateBanner = async (login, banner) => {
    const user = JSON.parse(localStorage.user)

    await fetchUpdateBanner(login, banner)
    user.banner = banner

    localStorage.user = JSON.stringify(user)
    return banner
  }

  return {
    getAvatar,
    getBanner,
    updateBanner,
  }
}
