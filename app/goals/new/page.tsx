'use client'
import React from 'react'
import { Grid } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
import GoalAddEditSkeleton from './loading'

const GoalAdd = dynamic(() => import('@/app/goals/_component/GoalAdd'), {
  ssr: false,
  loading: () => <GoalAddEditSkeleton />,
})
const Calender = dynamic(() => import('@/app/components/Calendar'), {
  ssr: false,
  loading: () => <GoalAddEditSkeleton />,
})

const NewGoal = () => {
  return (
    <Grid columns={'2'}>
      <GoalAdd />
      <Calender />
    </Grid>
  )
}

export default NewGoal
