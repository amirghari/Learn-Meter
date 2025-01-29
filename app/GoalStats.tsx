import { Status } from '@prisma/client'
import { Card, Flex, Progress, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import CardBadge from './components/CardBadge'

interface Props {
  justSet: number
  inProgress: number
  done: number
  postponed: number
}

const GoalStats = ({ justSet, inProgress, done, postponed }) => {
  const all: number = justSet + inProgress + done + postponed
  console.log(all)
  const containers: {
    label: string
    status: Status
    value: number
    percentage: number
  }[] = [
    {
      label: 'Just Set',
      status: 'JUST_SET',
      value: justSet,
      percentage: Math.round((justSet / all) * 100),
    },
    {
      label: 'In Progress',
      status: 'IN_PROGRESS',
      value: inProgress,
      percentage: Math.round((inProgress / all) * 100),
    },
    {
      label: 'Done',
      status: 'DONE',
      value: done,
      percentage: Math.round((done / all) * 100),
    },
    {
      label: 'Postponed',
      status: 'POSTPONED',
      value: postponed,
      percentage: Math.round((postponed / all) * 100),
    },
  ]

  return (
    <>
      <Flex className="w-1/2" gap="2">
        {containers.map((container) => (
          <Card className="w-4/5" key={container.label}>
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
                color="orange"
              />
            </Flex>
          </Card>
        ))}
      </Flex>
    </>
  )
}

export default GoalStats
