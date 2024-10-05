'use client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import 'easymde/dist/easymde.min.css'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createGoalSchema } from '@/app/validationSchema'
import { z } from 'zod'
import ErrorMessages from '@/app/components/ErrorMessages'
import Spinner from '@/app/components/Spinner'
import dayjs from 'dayjs'
import InputCalendar from '@/app/components/InputCalendar'
import { Goal } from '@prisma/client'
import dynamic from 'next/dynamic'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})
type goalAdd = z.infer<typeof createGoalSchema>

const GoalAdd = ({ goal }: { goal?: Goal }) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<goalAdd>({ resolver: zodResolver(createGoalSchema) })

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      if (goal) await axios.patch(`/api/goals/${goal.id}`, data)
      else await axios.post('/api/goals', data)
      router.push('/goals')
    } catch (error) {
      setIsSubmitting(false)
      if (error.response && error.response.status === 409) {
        setError('You already got this Goal!')
      } else {
        setError('An unexpected error has happened!')
      }
    }
  })
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-4" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-4" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={goal?.title}
          placeholder="Title"
          {...register('title')}
        />
        <ErrorMessages>{errors.title?.message}</ErrorMessages>
        <Controller
          name="deadline"
          control={control}
          defaultValue={goal?.deadline.toDateString()}
          render={({ field }) => (
            <InputCalendar
              value={field.value ? dayjs(field.value) : null}
              onChange={(newValue) =>
                field.onChange(
                  newValue ? dayjs(newValue).format('YYYY-MM-DD') : null,
                )
              }
            />
          )}
        />
        <ErrorMessages>{errors.deadline?.message}</ErrorMessages>
        <Controller
          name="description"
          defaultValue={goal?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE className="mb-0" placeholder="Description" {...field} />
          )}
        />
        <ErrorMessages>{errors.description?.message}</ErrorMessages>
        <Button disabled={isSubmitting}>
          {goal ? 'Update Your Goal' : 'Submit Your Goal'}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default GoalAdd
