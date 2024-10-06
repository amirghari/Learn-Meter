'use client'
import React from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
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
            '& .Mui-selected': {
              backgroundColor: '#F9982B !important', // Use orange for selected day
              color: 'white', // White text on selected day
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
