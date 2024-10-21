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
      // setError(true)
    }
  }
  const router = useRouter()
  //   const [error, setError] = useState(false)
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button size={'4'} color="red" style={{ width: '80%' }}>
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

      {/* <AlertDialog.Root open={error}>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>
          This Goal can not be deleted!
        </AlertDialog.Description>
        <AlertDialog.Action>
          <Button color="orange" variant="soft" onClick={() => setError(false)}>
            Ok
          </Button>
        </AlertDialog.Action>
      </AlertDialog.Root> */}
    </>
  )
}

export default DeleteGoalButton
