'use client'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
// import { useState } from 'react'

const DeleteGoalButton = ({ goalId }: { goalId: number }) => {
  const deleteGoal = async () => {
    try {
      await axios.delete(`/api/goals/${goalId}`)
      router.push('/goals/main')
      router.refresh()
    } catch {
      console.log('Error deleting goal')
    }
  }
  const router = useRouter()
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            size="3"
            color="red"
            style={{
              width: '70%',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              fontSize: '.9rem',
            }}
          >
            <RiDeleteBin2Line />
            Delete Goal
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this goal?
            <br /> ( This action cannot be undone! )
          </AlertDialog.Description>
          <Flex mt={'4'} gap={'2'}>
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteGoal}>
                Delete Goal
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteGoalButton
