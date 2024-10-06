import prisma from '@/prisma/client'
import GoalAdd from '../../_component/GoalAdd'
import Calendar from '@/app/components/Calendar'
import { Grid } from '@radix-ui/themes'

interface Props {
  params: { id: string }
}

const UpdateGoalPage = async ({ params }: Props) => {
  const targetedGoal = await prisma.goal.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })
  return (
    <Grid columns={'2'}>
      <GoalAdd goal={targetedGoal} />
      <Calendar />
    </Grid>
  )
}

export default UpdateGoalPage
