'use client'

import './style.scss'
import { useState } from 'react'

interface TruncateTextProps {
  text?: string
  maxLength?: number
  fontSize?: number
  classStyle?: string
  more?: boolean
}

export function TruncateText({
  text = 'Text cần cắt',
  maxLength = 20,
  fontSize = 18,
  classStyle = '',
  more = false,
}: TruncateTextProps) {
  const [isFullText, setIsFullText] = useState(false)
  const handleMore = () => setIsFullText(!isFullText)

  const shouldTruncate = text.length > maxLength

  return (
    <div
      className={`truncate-text ${classStyle}`}
      title={text}
      style={{ fontSize: `${fontSize}px` }}
    >
      {isFullText ? (
        <>
          {text}
          {more && (
            <button className='more-text' onClick={handleMore}>
              Thu gọn
            </button>
          )}
        </>
      ) : shouldTruncate ? (
        <>
          {text.substring(0, maxLength)}...
          {more && (
            <button className='more-text' onClick={handleMore}>
              Xem thêm
            </button>
          )}
        </>
      ) : (
        text
      )}
    </div>
  )
}

export default TruncateText
