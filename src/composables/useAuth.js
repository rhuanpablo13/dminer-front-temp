import { fetchtAuth } from '@/api/auth'

export default function useAuth() {
  const login = async (user) => {
    const auth = await fetchtAuth(user)
    if (auth && auth.baererAuthentication) {
      sessionStorage.user = JSON.stringify(auth)
      return auth
    }

     throw 400
  }

  const logoutUse = () => {
    let userReminder = {}
    let reminderPassword = localStorage.reminderPassword
    if (reminderPassword) {
      userReminder = JSON.parse(localStorage.userReminder)
    }
    
    localStorage.clear()
    
    if (reminderPassword) {
      localStorage.reminderPassword = reminderPassword
      localStorage.userReminder = JSON.stringify(userReminder)
    }
    
    sessionStorage.removeItem('timeout');
    sessionStorage.removeItem('user');
    window.location.reload();

    return 200
  }

  return {
    login,
    logoutUse
  }
}
