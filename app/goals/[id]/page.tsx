import prisma from '@/prisma/client'
import React from 'react'
import delay from 'delay'

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
    <div>
      <p>Title : {selectedGoal.title}</p>
      <p>Description : {selectedGoal.description}</p>
      <p>Created at: {selectedGoal.createdAT.toDateString()}</p>
      <p>Due Date: {selectedGoal.deadline.toDateString()}</p>
    </div>
  )
}

export default GoalAdjustments
