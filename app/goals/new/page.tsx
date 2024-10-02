'use client'
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface goal {
  title: string
  description: string
}

const NewGoal = () => {
  const { register, control, handleSubmit } = useForm<goal>()
  const router = useRouter()
  return (
    <form
      className="max-w-xl space-y-4"
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/goals', data)
        router.push('/goals')
      })}
    >
      <TextField.Root placeholder="Title" {...register('title')} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <Button>Submit New Goal</Button>
    </form>
  )
}

export default NewGoal
