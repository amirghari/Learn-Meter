import prisma from '@/prisma/client'
import GoalAdd from '../../_component/GoalAdd'

interface Props {
  params: { id: string }
}

const UpdateGoalPage = async ({ params }: Props) => {
  const targetedGoal = await prisma.goal.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })
  return <GoalAdd goal={targetedGoal} />
}

export default UpdateGoalPage
