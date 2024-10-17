'use client'
import CardBadge from '@/app/components/CardBadge'
import { Goal } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const GoalDetail = ({ selectedGoal }: { selectedGoal: Goal }) => {
  return (
    <>
      <Heading className="text-center">{selectedGoal.title}</Heading>
      <Flex justify={'center'} className="my-4" gap={'4'}>
        <Text as="span">
          Created at: {selectedGoal.createdAT.toDateString()}
        </Text>
        <CardBadge status={selectedGoal.status} />
        <Text>Due Date: {selectedGoal.deadline.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full">
        <ReactMarkdown className="text-center">
          {selectedGoal.description}
        </ReactMarkdown>
      </Card>
    </>
  )
}

export default GoalDetail
