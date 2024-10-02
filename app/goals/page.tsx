import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <Link href={'goals/new/'}>
        <Button>New Goal</Button>
      </Link>
    </div>
  )
}

export default page
