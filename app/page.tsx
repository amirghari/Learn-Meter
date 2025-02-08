import { Flex } from '@radix-ui/themes'
import GoalStats from './GoalStats'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import authOptions from './auth/authOptions'
import RecentGoals from './RecentGoals'
import GoalBarChart from './GoalBarChart'
import GoalPieChart from './GoalPieChart'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/api/auth/signin')
  }
  const justSet = await prisma.goal.count({
    where: {
      status: 'JUST_SET',
      userEmail: session?.user.email,
    },
  })
  const inProgress = await prisma.goal.count({
    where: {
      status: 'IN_PROGRESS',
      userEmail: session?.user.email,
    },
  })
  const done = await prisma.goal.count({
    where: {
      status: 'DONE',
      userEmail: session?.user.email,
    },
  })
  const postponed = await prisma.goal.count({
    where: {
      status: 'POSTPONED',
      userEmail: session?.user.email,
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
        mb={'9'}
      >
        <RecentGoals />
        <GoalStats
          justSet={justSet}
          inProgress={inProgress}
          done={done}
          postponed={postponed}
        />
      </Flex>

      <Flex
        direction={{
          initial: 'column',
          md: 'row',
        }}
        gap="4"
      >
        <GoalBarChart
          justSet={justSet}
          inProgress={inProgress}
          done={done}
          postponed={postponed}
        />
        <GoalPieChart
          justSet={justSet}
          inProgress={inProgress}
          done={done}
          postponed={postponed}
        />
      </Flex>
    </>
  )
}

export const metadata: Metadata = {
  title: 'Learn Meter - Dashboard',
  description: 'A summary of your goals and progress',
  icons: {
    icon: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        url: '/app/favicon/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/app/favicon/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/app/favicon/favicon-16x16.png',
      },
    ],
    apple: '/app/favicon/apple-touch-icon.png',
  },
}
