'use client'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const EditGoalButton = ({ goalId }: { goalId: number }) => {
  return (
    <Button>
      <Pencil1Icon />
      <Link href={`${goalId}/update`}>Edit Your Goal</Link>
    </Button>
  )
}

export default EditGoalButton
