'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../app/assets/book_8805366.png'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes'

const NavBar = () => {
  const currentPath = usePathname()
  const { status, data: session } = useSession()
  const links = [
    { name: 'Dashboard', url: '/' },
    { name: 'My Goals', url: '/goals/main' },
  ]
  return (
    <nav className="space-x-6 px-4 border-b mb-5 py-3 text-lg">
      <Container>
        <Flex align={'center'} justify={'between'}>
          <Flex align={'center'} gap={'3'}>
            <Link href="/">
              <Image src={logo} alt={'logo'} width={40} />
            </Link>

            <ul className="flex space-x-6 ">
              {links.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className={classNames({
                      'text-zinc-900 hover:text-zinc-900':
                        currentPath === link.url,
                      'text-zinc-400': currentPath !== link.url,
                      'hover:text-zinc-600 transition-colors': true,
                    })}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user.image}
                    fallback={'?'}
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <Text align={'center'} className="font-bold" size={'2'}>
                    {session.user.name}
                  </Text>
                  <Text className="py-4" size={'2'}>
                    {session.user.email}
                  </Text>
                  <Button color="red" variant="surface">
                    <Link href={'/api/auth/signout'}>Log out</Link>
                  </Button>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === 'unauthenticated' && (
              <Button color="green" variant="surface">
                <Link href={'/api/auth//signin'}>Log in</Link>
              </Button>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar
