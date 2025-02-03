import prisma from '@/prisma/client'
import ClientLayout from './ClientLayout'

interface Props {
  params: { id: string }
}

const UpdateGoalPage = async ({ params }: Props) => {
  const targetedGoal = await prisma.goal.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })

  return <ClientLayout targetedGoal={targetedGoal} />
}

export default UpdateGoalPage

export async function generateMetadata({ params }: Props) {
  const goal = await prisma.goal.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })
  return {
    title: `${goal?.title} Update`,
    description: 'Update your goal',
  }
}
