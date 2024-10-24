'use client'
import React from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'

interface InputCalendarProps {
  value: Dayjs | null
  onChange: (value: Dayjs | null) => void
}

const InputCalendar = ({ value, onChange }: InputCalendarProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Deadline"
        value={value}
        onChange={onChange}
        slotProps={{
          day: {
            sx: {
              width: 570,
              borderRadius: '50%', // Ensure days remain circular
              '&.Mui-selected': {
                backgroundColor: '#557C56 !important', // Use orange for selected day
                color: 'white', // White text for selected day
              },
              '&:hover': {
                backgroundColor: 'rgba(249, 152, 43, 0.13)', // Light orange on hover
              },
            },
          },
        }}
        sx={{
          width: 570,
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
  )
}

export default InputCalendar
