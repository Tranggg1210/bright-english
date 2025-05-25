'use client'

import './style.scss'
import { BookIcon } from '@src/components/svgs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

interface NavCardProps {
  icon?: any;
  title?: string;
  to?: string;
  classStyle?: string;
  enlarge?: boolean;
}

export const NavCard: FC<NavCardProps> = ({
  icon = <BookIcon/>,
  title = 'Sách của tôi',
  to = '/',
  classStyle = '',
  enlarge = true,
}) => {
  const pathname = usePathname()

  const getClassName = (to: string): string => {
    if (!to) return ''
    if (pathname === to) return 'nav-active'
    if (pathname.includes('/progress') && to === '/app') return 'nav-active'
    if (pathname.includes('/detail-flashcard') && to === '/flashcard') return 'nav-active'
    return ''
  }

  return (
    <Link
      href={to}
      title={title}
      className={`nav-card ${classStyle} ${getClassName(to)} ${
        enlarge ? '' : 'nav-card-icon-shrik'
      }`}
    >
      <div className='nav-card-icon'>
        <Image src={icon} alt='icon' />
      </div>
      <div className='nav-card-title'>{title}</div>
      <div className='nav-tick'></div>
    </Link>
  )
}

export default NavCard
