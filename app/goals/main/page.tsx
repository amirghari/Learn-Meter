import prisma from '@/prisma/client'
import { Grid } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import Goals from './Goals'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/api/auth/signin')
  }

  const allGoals = await prisma.goal.findMany()

  const goals = allGoals.filter((goal) => goal.userEmail === session.user.email)

  return (
    <div>
      <Grid>
        <Goals serverGoals={goals} />
      </Grid>
    </div>
  )
}
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Learn Meter - Goals',
  description: 'View all Goals',
}
