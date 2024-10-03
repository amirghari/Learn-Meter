import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const CardBadge = ({ status }: { status: Status }) => {
  const badgeMap: Record<
    Status,
    { label: string; color: 'orange' | 'violet' | 'green' }
  > = {
    JUST_SET: { label: 'Just Set', color: 'orange' },
    IN_PROGRESS: { label: 'In progress', color: 'violet' },
    DONE: { label: 'Done', color: 'green' },
  }
  return <Badge color={badgeMap[status].color}>{badgeMap[status].label}</Badge>
}

export default CardBadge
