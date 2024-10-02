import React from 'react'
import { Text } from '@radix-ui/themes'

interface Props {
  children: string
}

const ErrorMessages = ({ children }: Props) => {
  if (!children) return null
  return (
    <Text color="red" as="p">
      {children}
    </Text>
  )
}

export default ErrorMessages
