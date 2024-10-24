'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../app/assets/book_8805366.png'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Box } from '@radix-ui/themes'

const NavBar = () => {
  const currentPath = usePathname()
  const { status, data: session } = useSession()
  const links = [
    { name: 'Dashboard', url: '/' },
    { name: 'My Goals', url: '/goals/main' },
  ]
  return (
    <nav className="flex space-x-6 px-4 border-b mb-5 h-14 items-center text-lg">
      <Link href="/">
        <Image src={logo} alt={'logo'} width={40} />
      </Link>

      <ul className="flex space-x-6 ">
        {links.map((link) => (
          <li key={link.url}>
            <Link
              href={link.url}
              className={classNames({
                'text-zinc-900 hover:text-zinc-900': currentPath === link.url,
                'text-zinc-400': currentPath !== link.url,
                'hover:text-zinc-600 transition-colors': true,
              })}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'authenticated' && (
          <Link href={'/api/auth/signout'}>Log out</Link>
        )}
        {status === 'unauthenticated' && (
          <Link href={'api/auth//signin'}>Log in</Link>
        )}
      </Box>
    </nav>
  )
}

export default NavBar
