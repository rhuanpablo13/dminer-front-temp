import { createToast } from 'mosha-vue-toastify'
import * as translation from '@/util/pt_BR.json'

// 'info', 'danger', 'warning', 'success', 'default'

export const onToast = (message, type = 'default') => {
  createToast(message, {
    position: 'top-right',
    type: type,
    transition: 'bounce',
    showIcon: 'true',
    hideProgressBar: 'false'
  })
}

export const messagesFetch = (type, status, data) => {
  if (status === 200) {
    onToast(translation.MESSAGE[`SUCCESS_${type.toUpperCase()}`], 'success')
    return data
  } else {
    onToast(translation.MESSAGE[`ERROR_${type.toUpperCase()}`], 'danger')
    return null
  }
}
