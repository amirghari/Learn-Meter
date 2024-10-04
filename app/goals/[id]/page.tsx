import prisma from '@/prisma/client'
import React from 'react'
import delay from 'delay'
import CardBadge from '@/app/components/CardBadge'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

interface Props {
  params: { id: string }
}

const GoalAdjustments = async ({ params }: Props) => {
  await delay(1000)
  const selectedGoal = await prisma.goal.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })

  return (
    <div className="px-4">
      <Heading>{selectedGoal.title}</Heading>
      <Flex className="my-4" gap={'4'}>
        <Text>Created at: {selectedGoal.createdAT.toDateString()}</Text>
        <CardBadge status={selectedGoal.status} />
        <Text>Due Date: {selectedGoal.deadline.toDateString()}</Text>
      </Flex>
      <Card className="min-w-6 prose">
        <ReactMarkdown>{selectedGoal.description}</ReactMarkdown>
      </Card>
    </div>
  )
}

export default GoalAdjustments
