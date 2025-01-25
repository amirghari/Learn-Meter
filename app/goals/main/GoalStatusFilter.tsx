import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'

const Statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Done', value: 'DONE' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Postponed', value: 'POSTPONED' },
]

const GoalStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter By Status"></Select.Trigger>
      <Select.Content>
        {Statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || null}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default GoalStatusFilter
