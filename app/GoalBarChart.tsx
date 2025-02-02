'use client'
import { Flex } from '@radix-ui/themes'
import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Cell,
} from 'recharts'
interface Props {
  justSet: number
  inProgress: number
  done: number
  postponed: number
}
const GoalBarChart = ({ justSet, inProgress, done, postponed }: Props) => {
  const all: number = justSet + inProgress + done + postponed
  const data = [
    {
      name: 'Just Set',
      value: Math.round((justSet / all) * 100),
      color: '#f66a15',
    },
    {
      name: 'In Progress',
      value: Math.round((inProgress / all) * 100),
      color: '#6e56cf',
    },
    {
      name: 'Done',
      value: Math.round((done / all) * 100),
      color: '#30a56d',
    },
    {
      name: 'Postponed',
      value: Math.round((postponed / all) * 100),
      color: '#fbdc00',
    },
  ]
  return (
    <Flex
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ResponsiveContainer width="80%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Bar dataKey="value" barSize={60}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Flex>
  )
}

export default GoalBarChart
