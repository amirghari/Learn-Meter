import { Flex } from '@radix-ui/themes'
import GoalStats from './GoalStats'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import authOptions from './auth/authOptions'
import RecentGoals from './RecentGoals'
import GoalBarChart from './GoalBarChart'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const justSet = await prisma.goal.count({
    where: {
      status: 'JUST_SET',
      userEmail: session.user.email,
    },
  })
  const inProgress = await prisma.goal.count({
    where: {
      status: 'IN_PROGRESS',
      userEmail: session.user.email,
    },
  })
  const done = await prisma.goal.count({
    where: {
      status: 'DONE',
      userEmail: session.user.email,
    },
  })
  const postponed = await prisma.goal.count({
    where: {
      status: 'POSTPONED',
      userEmail: session.user.email,
    },
  })
  return (
    <>
      <Flex
        direction={{
          initial: 'column',
          md: 'row',
        }}
        gap="4"
        justify="between"
        mb={'8'}
      >
        <RecentGoals />
        <GoalStats
          justSet={justSet}
          inProgress={inProgress}
          done={done}
          postponed={postponed}
        />
      </Flex>
      <GoalBarChart
        justSet={justSet}
        inProgress={inProgress}
        done={done}
        postponed={postponed}
      />
    </>
  )
}
