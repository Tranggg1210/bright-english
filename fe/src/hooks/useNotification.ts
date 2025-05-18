'use client'
import { useRef } from 'react'
import { toast } from 'react-toastify'

const useNotification = () => {
  const toastIdRef = useRef<string | number | null>(null)

  const notify = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    if (!navigator.onLine) {
      if (toastIdRef.current) toast.dismiss(toastIdRef.current)
      toastIdRef.current = toast.error('Mất kết nối, vui lòng kiểm tra kết nối mạng của bạn.', {
        autoClose: 3000,
      })
      return
    }

    if (toastIdRef.current) toast.dismiss(toastIdRef.current)

    const options = { autoClose: 3000 }

    switch (type) {
      case 'success':
        toastIdRef.current = toast.success(message, options)
        break
      case 'error':
        toastIdRef.current = toast.error(message, options)
        break
      case 'warning':
        toastIdRef.current = toast.warning(message, options)
        break
      case 'info':
        toastIdRef.current = toast.info(message, options)
        break
      default:
        break
    }
  }

  return { notify }
}

export default useNotification
