import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Text } from '@radix-ui/themes'
import Link from 'next/link'
import CardBadge from '../../components/CardBadge'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { RiPoliceBadgeLine } from 'react-icons/ri'
import { TbCalendarDue } from 'react-icons/tb'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'

const page = async () => {
  const allGoals = await prisma.goal.findMany()
  const session = await getServerSession(authOptions)
  const goals = allGoals.filter((goal) => goal.userEmail === session.user.email)

  return (
    <div>
      <Link href={'new/'}>
        <Button>New Goal</Button>
      </Link>
      <Grid
        width={'lg'}
        columns={{ initial: '1', xs: '2', sm: '3', md: '4' }}
        gap="3"
        className="my-8 flex space-x-2"
      >
        {goals &&
          goals.map((goal) => (
            <Card key={goal.id}>
              <Box className="space-y-4">
                <Text className="text-center text-xl font-bold" as="p">
                  {goal.title}
                </Text>
                <div className="flex space-x-3">
                  <RiPoliceBadgeLine size={23} color="orange" />
                  <CardBadge status={goal.status} />
                </div>
                <div className="flex space-x-3 ">
                  <MdOutlineCreateNewFolder size={23} color="orange" />
                  <Text className="text-center" as="p">
                    {goal.createdAT.toDateString()}
                  </Text>
                </div>
                <div className="flex space-x-3 ">
                  <TbCalendarDue size={23} color="orange" />
                  <Text className="text-center" as="p">
                    {goal.deadline.toDateString()}
                  </Text>
                </div>
                <Flex justify={{ initial: 'center', lg: 'start' }}>
                  <Button className="align-center">
                    <Link href={`${goal.id}`}>
                      {goal.status === 'DONE'
                        ? 'Review Your Goal'
                        : 'Adjust Your Goal '}
                    </Link>
                  </Button>
                </Flex>
              </Box>
            </Card>
          ))}
      </Grid>
    </div>
  )
}
export const dynamic = 'force-dynamic'
export default page
