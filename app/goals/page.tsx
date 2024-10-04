import prisma from '@/prisma/client'
import { Box, Button, Card, Grid, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import CardBadge from '../components/CardBadge'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { RiPoliceBadgeLine } from 'react-icons/ri'
import { TbCalendarDue } from 'react-icons/tb'

import delay from 'delay'

const page = async () => {
  await delay(2000)
  const goals = await prisma.goal.findMany()

  return (
    <div>
      <Link href={'goals/new/'}>
        <Button>New Goal</Button>
      </Link>
      <Grid width={'lg'} columns="4" gap="3" className="my-8 flex space-x-2">
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
                <Button className="text-center">
                  <Link href={`goals/${goal.id}`}>
                    {goal.status === 'DONE'
                      ? 'Review Your Goal'
                      : 'Adjust Your Goal '}
                  </Link>
                </Button>
              </Box>
            </Card>
          ))}
      </Grid>
    </div>
  )
}

export default page
