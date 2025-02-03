'use client'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditGoalButton = ({ goalId }: { goalId: number }) => {
  return (
    <Link href={`${goalId}/update`}>
      <Button
        size="3"
        style={{
          width: '70%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          fontSize: '.9rem',
        }}
      >
        <Pencil1Icon />
        Update Goal
      </Button>
    </Link>
  )
}

export default EditGoalButton
