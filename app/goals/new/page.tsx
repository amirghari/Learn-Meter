import React from 'react'
import GoalAdd from '../_component/GoalAdd'
import { Grid } from '@radix-ui/themes'
import Calender from '@/app/components/Calendar'
const NewGoal = () => {
  return (
    <Grid columns={'2'}>
      <GoalAdd />
      <Calender />
    </Grid>
  )
}

export default NewGoal
