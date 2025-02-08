'use client'

import { useEffect, useState } from 'react'
import { Grid } from '@radix-ui/themes'
import Calendar from '@/app/components/Calendar'
import GoalAdd from '../_component/GoalAdd'

const ClientLayout = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 992)
      }

      handleResize()
      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap={'3'} className="p-4">
      {isMobile ? <Calendar /> : <GoalAdd />}
      {isMobile ? <GoalAdd /> : <Calendar />}
    </Grid>
  )
}

export default ClientLayout
