'use client'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const EditGoalButton = ({ goalId }: { goalId: number }) => {
  return (
    <Link href={`${goalId}/update`}>
      <Button>
        <Pencil1Icon />
        Edit Your Goal
      </Button>
    </Link>
  )
}

export default EditGoalButton
