import { Status } from '@prisma/client'
import { Card, Flex, Progress, Text } from '@radix-ui/themes'
import React from 'react'
import CardBadge from './components/CardBadge'

interface Props {
  justSet: number
  inProgress: number
  done: number
  postponed: number
}

const GoalStats = ({ justSet, inProgress, done, postponed }: Props) => {
  const all: number = justSet + inProgress + done + postponed
  const containers: {
    label: string
    status: Status
    value: number
    percentage: number
    color: 'orange' | 'violet' | 'green' | 'yellow'
  }[] = [
    {
      label: 'Just Set',
      status: 'JUST_SET',
      value: justSet,
      percentage: Math.round((justSet / all) * 100) | 0,
      color: 'orange',
    },
    {
      label: 'In Progress',
      status: 'IN_PROGRESS',
      value: inProgress,
      percentage: Math.round((inProgress / all) * 100) | 0,
      color: 'violet',
    },
    {
      label: 'Done',
      status: 'DONE',
      value: done,
      percentage: Math.round((done / all) * 100) | 0,
      color: 'green',
    },
    {
      label: 'Postponed',
      status: 'POSTPONED',
      value: postponed,
      percentage: Math.round((postponed / all) * 100) | 0,
      color: 'yellow',
    },
  ]

  return (
    <>
      <Flex className="lg:w-1/2 md:w-full" gap="2">
        {containers.map((container) => (
          <Card className="w-4/5 md:w-full" key={container.label}>
            <Flex gap="8" direction="column" align="center" justify={'between'}>
              <CardBadge status={container.status} />
              <Text size="5" className="font-bold">
                {container.value}
              </Text>
              <Text
                size="5"
                className="font-bold"
              >{`${container.percentage}%`}</Text>
              <Progress
                className="w-full"
                size="3"
                value={Math.floor(container.percentage)}
                color={container.color}
              />
            </Flex>
          </Card>
        ))}
      </Flex>
    </>
  )
}

export default GoalStats
