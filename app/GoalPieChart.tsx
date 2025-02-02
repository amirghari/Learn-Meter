'use client'
import React from 'react'
import { Flex } from '@radix-ui/themes'
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

interface Props {
  justSet: number
  inProgress: number
  done: number
  postponed: number
}

export default function GoalPieChart({
  justSet,
  inProgress,
  done,
  postponed,
}: Props) {
  const total = justSet + inProgress + done + postponed
  const safeTotal = total === 0 ? 1 : total

  const data = [
    {
      name: 'Just Set',
      value: Math.round((justSet / safeTotal) * 100),
      color: '#f66a15',
    },
    {
      name: 'In Progress',
      value: Math.round((inProgress / safeTotal) * 100),
      color: '#6e56cf',
    },
    {
      name: 'Done',
      value: Math.round((done / safeTotal) * 100),
      color: '#30a56d',
    },
    {
      name: 'Postponed',
      value: Math.round((postponed / safeTotal) * 100),
      color: '#fbdc00',
    },
  ]

  return (
    <Flex
      style={{ width: '100%', minHeight: '350px', justifyContent: 'center' }}
    >
      <ResponsiveContainer width="80%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            innerRadius={50} // if you'd like a donut shape
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </Flex>
  )
}
