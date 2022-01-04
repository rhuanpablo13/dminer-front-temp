import { createStore } from 'vuex'
import { auth } from './auth.module'
import { user } from './user.module'
import { sidebar } from './sidebar.module'
import { home } from './home.module'
import { form } from './form.module'
import { dropdown } from './dropdown.module'
import { post } from './post.module'
import { calendar } from './calendar.module'

const store = createStore({
  modules: {
    auth,
    user,
    sidebar,
    home,
    dropdown,
    form,
    post,
    calendar
  }
})

export default store
