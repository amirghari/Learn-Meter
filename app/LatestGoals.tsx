import prisma from '@/prisma/client'
import { Card, Flex, Table } from '@radix-ui/themes'
import authOptions from '@/app/auth/authOptions'
import { getServerSession } from 'next-auth'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { CgCalendarDue } from 'react-icons/cg'

import { PiStepsDuotone } from 'react-icons/pi'

import React from 'react'
import Link from 'next/link'
import CardBadge from './components/CardBadge'

const LatestGoals = async () => {
  const session = await getServerSession(authOptions)
  const recentGoals = await prisma.goal.findMany({
    orderBy: {
      deadline: 'desc',
    },
    take: 5,
  })
  const goals = recentGoals.filter(
    (goal) => goal.userEmail === session.user.email,
  )
  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              <MdOutlineDriveFileRenameOutline
                style={{ marginLeft: '2rem' }}
                size={23}
                color="orange"
              />
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <PiStepsDuotone
                style={{ marginLeft: '1rem' }}
                size={23}
                color="orange"
              />
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <CgCalendarDue
                style={{ marginLeft: '2rem' }}
                size={23}
                color="orange"
              />
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {goals.map((goal) => (
            <Table.Row key={goal.id}>
              <Table.Cell>
                <Flex direction="column" align="start" gap="2">
                  <Link href={`goals/${goal.id}`}>{goal.title}</Link>
                </Flex>
              </Table.Cell>
              <Table.Cell>
                <CardBadge status={goal.status} />
              </Table.Cell>
              <Table.Cell>{goal.deadline.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}

export default LatestGoals
