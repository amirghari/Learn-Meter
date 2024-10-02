'use client'
import { Button, TextField } from '@radix-ui/themes'
import React from 'react'

const NewGoal = () => {
  return (
    <div className="max-w-xl space-y-4">
      <TextField.Root placeholder="title" />
      <TextField.Root placeholder="description" />
      <Button>Submit New Goal</Button>
    </div>
  )
}

export default NewGoal
