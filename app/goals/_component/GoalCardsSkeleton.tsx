import prisma from '@/prisma/client'
import { Grid, Card, Box, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const GoalCardsSkeleton = async () => {
  const goals = await prisma?.goal.findMany()

  return (
    <div>
      <Link href={'goals/new/'}>
        <Skeleton />
      </Link>
      <Grid
        width={'lg'}
        columns={{ initial: '1', xs: '2', sm: '3', md: '4' }}
        gap="3"
        className="mt-8 flex space-x-2"
      >
        {goals &&
          goals.map((goal) => (
            <Card key={goal.id}>
              <Box className="space-y-4">
                <Text className="text-center text-xl font-bold" as="p">
                  <Skeleton />
                </Text>
                <div className="flex space-x-3">
                  <Skeleton />
                  <Skeleton />
                </div>
                <div className="flex space-x-3 ">
                  <Skeleton />
                  <Text className="text-center" as="p">
                    <Skeleton />
                  </Text>
                </div>
                <div className="flex space-x-3 ">
                  <Skeleton />
                  <Text className="text-center" as="p">
                    <Skeleton />
                  </Text>
                </div>
                <Skeleton />
              </Box>
            </Card>
          ))}
      </Grid>
    </div>
  )
}

export default GoalCardsSkeleton
