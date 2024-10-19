import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import GoalDetail from './GoalDetail'
import EditGoalButton from './EditGoalButton'
import DeleteGoalButton from './DeleteGoalButton'

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
    <Grid columns={{ initial: '1', md: '5' }} gap={'3'} className="px-4">
      <Box className="col-span-4">
        <GoalDetail selectedGoal={selectedGoal} />
      </Box>
      <Flex
        gap={'3'}
        direction={'column'}
        justify={{ initial: 'center', md: 'start' }}
        className="max-w-full"
      >
        {selectedGoal.status === 'DONE' ? (
          <DeleteGoalButton goalId={selectedGoal.id} />
        ) : (
          <Flex gap={'3'} direction={'column'} justify={'center'}>
            <EditGoalButton goalId={selectedGoal.id} />
            <DeleteGoalButton goalId={selectedGoal.id} />
          </Flex>
        )}
      </Flex>
    </Grid>
  )
}

export default GoalAdjustments
