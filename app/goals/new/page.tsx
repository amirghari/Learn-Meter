'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Dynamically import ClientLayout to prevent any SSR issues
const ClientLayout = dynamic(() => import('./ClientLayout'), { ssr: false })

const NewGoal = () => {
  return <ClientLayout />
}

export default NewGoal
