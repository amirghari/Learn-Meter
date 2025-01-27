'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

const Statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Done', value: 'DONE' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Postponed', value: 'POSTPONED' },
  { label: 'Just Set', value: 'JUST_SET' },
]

const GoalStatusFilter = () => {
  const router = useRouter()

  return (
    <Select.Root
      onValueChange={(status: string) => {
        if (!status) {
          // No query param
          router.push('/goals/main')
        } else {
          // param
          router.push(`/goals/main?status=${status}`)
        }
      }}
    >
      <Select.Trigger placeholder="Filter By Status" />
      <Select.Content>
        {Statuses.map((item) => (
          <Select.Item key={item.value} value={item.value || null}>
            {item.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default GoalStatusFilter
