import { RiDeleteBin2Line } from 'react-icons/ri'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
// import Link from 'next/link'

const DeleteGoalButton = () =>
  // { goalId }: { goalId: number }
  {
    return (
      <div>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            {/* <Link href={}> */}
            <Button size={'4'} color="red" style={{ width: '80%' }}>
              <RiDeleteBin2Line />
              Delete Goal
            </Button>
            {/* </Link> */}
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
                <Button color="red">Delete Goal</Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    )
  }

export default DeleteGoalButton
