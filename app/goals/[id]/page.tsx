import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
  params: { id: string }
}

const GoalAdjustments = async ({ params }: Props) => {
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
