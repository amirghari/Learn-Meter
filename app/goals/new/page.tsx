'use client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
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
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

type goal = z.infer<typeof createGoalSchema>

const NewGoal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<goal>({ resolver: zodResolver(createGoalSchema) })
  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      await axios.post('/api/goals', data)
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
        <TextField.Root placeholder="Title" {...register('title')} />
        <ErrorMessages>{errors.title?.message}</ErrorMessages>

        {/* Controller for DatePicker */}
        <Controller
          name="deadline"
          control={control}
          defaultValue={null} // Ensure defaultValue is set to avoid uncontrolled component warning
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Deadline"
                value={field.value ? dayjs(field.value) : null} // Ensure the value is valid or null
                onChange={(newValue) =>
                  field.onChange(
                    newValue ? dayjs(newValue).format('YYYY-MM-DD') : null,
                  )
                }
                sx={{
                  width: 575,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '6px',
                    '& fieldset': {
                      borderColor: '#CED4D9',
                    },
                    '&:hover fieldset': {
                      borderColor: '#CED4D9',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'orange',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#838383',
                    '&.Mui-focused': {
                      color: '#838383',
                    },
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />

        <ErrorMessages>{errors.deadline?.message}</ErrorMessages>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessages>{errors.description?.message}</ErrorMessages>

        <Button disabled={isSubmitting}>
          Submit New Goal
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default NewGoal
