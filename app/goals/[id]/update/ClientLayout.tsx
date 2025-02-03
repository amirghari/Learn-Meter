'use client'

import { useEffect, useState } from 'react'
import { Grid } from '@radix-ui/themes'
import Calendar from '@/app/components/Calendar'
import GoalAdd from '../../_component/GoalAdd'
import { Goal } from '@prisma/client'

interface Props {
  targetedGoal: Goal
}

const ClientLayout = ({ targetedGoal }: Props) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap={'3'} className="p-4">
      {isMobile ? <Calendar /> : <GoalAdd goal={targetedGoal} />}
      {isMobile ? <GoalAdd goal={targetedGoal} /> : <Calendar />}
    </Grid>
  )
}

export default ClientLayout
