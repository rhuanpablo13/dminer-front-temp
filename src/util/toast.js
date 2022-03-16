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

export const messagesFetch = (type, status, data, message = null) => {
  if (status === 200) {
    onToast(translation.MESSAGE[`SUCCESS_${type.toUpperCase()}`], 'success')
    return data
  } else {
    const _message = message || message !== 400 ? message : translation.MESSAGE[`ERROR_${type.toUpperCase()}`]
    onToast(_message, 'danger')
    return null
  }
}
