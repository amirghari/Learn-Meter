'use client'
import React, { useState } from 'react'
import { Goal, Status } from '@prisma/client'
import { Box, Button, Card, Flex, Grid, Text, Select } from '@radix-ui/themes'
import Link from 'next/link'
import CardBadge from '../../components/CardBadge'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { RiPoliceBadgeLine } from 'react-icons/ri'
import { TbCalendarDue } from 'react-icons/tb'

type GoalType = Goal

interface Props {
  serverGoals: GoalType[]
}

const statusOptions: { label: string; value?: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Done', value: 'DONE' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Postponed', value: 'POSTPONED' },
  { label: 'Just Set', value: 'JUST_SET' },
]

export default function Goals({ serverGoals }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | Status>('ALL')

  const filteredGoals =
    selectedStatus === 'ALL'
      ? serverGoals
      : serverGoals.filter((g) => g.status === selectedStatus)

  return (
    <div>
      <Flex mb="5" justify="between">
        <Button asChild>
          <Link href="new/">New Goal</Link>
        </Button>
        <Select.Root
          value={selectedStatus}
          onValueChange={(value) => {
            const val = value as Status | 'ALL'
            setSelectedStatus(val)
          }}
        >
          <Select.Trigger placeholder="Filter By Status" />
          <Select.Content>
            {statusOptions.map((opt) => (
              <Select.Item key={opt.value} value={opt.value ?? 'ALL'}>
                {opt.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>

      <Grid
        width="lg"
        columns={{ initial: '1', xs: '2', sm: '3', md: '4' }}
        gap="3"
        className="my-8 flex space-x-2"
      >
        {filteredGoals.map((goal) => (
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
