import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import GoalDetail from './GoalDetail'
import EditGoalButton from './EditGoalButton'

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
    <Grid columns={{ initial: '1', md: '2' }} gap={'3'} className="px-4">
      <Box>
        <GoalDetail selectedGoal={selectedGoal} />
      </Box>
      <Flex justify={{ initial: 'center', md: 'start' }}>
        {selectedGoal.status !== 'DONE' && (
          <EditGoalButton goalId={selectedGoal.id} />
        )}
      </Flex>
    </Grid>
  )
}

export default GoalAdjustments
