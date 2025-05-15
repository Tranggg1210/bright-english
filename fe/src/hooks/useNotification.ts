'use client'
import { useRef } from 'react'
import { toast } from 'react-toastify'

const useNotification = () => {
  const toastIdRef = useRef<string | number | null>(null)

  const notify = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    if (!navigator.onLine) {
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current) 
      }
      toastIdRef.current = toast.error('Mất kết nối, vui lòng kiểm tra kết nối mạng của bạn.')
      return
    }

    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current)
    }

    switch (type) {
      case 'success':
        toastIdRef.current = toast.success(message)
        break
      case 'error':
        toastIdRef.current = toast.error(message)
        break
      case 'warning':
        toastIdRef.current = toast.warning(message)
        break
      case 'info':
        toastIdRef.current = toast.info(message)
        break
      default:
        break
    }
  }

  return { notify }
}

export default useNotification
