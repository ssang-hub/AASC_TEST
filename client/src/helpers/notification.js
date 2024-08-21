import {toast} from 'react-toastify'

/**
 * @param {string} msg
 * @param {boolean} isSuccess
 * */
export const showNotification = (msg, isSuccess) => {
    if (isSuccess) {
        toast.success(msg, {position: 'bottom-right'})
    } else if (!isSuccess) {
        toast.error(msg, {position: 'bottom-right'})
    }
}