'use client'
import React from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

interface InputCalendarProps {
  value: Dayjs | null
  onChange: (value: Dayjs | null) => void
}

const InputCalendar = ({ value, onChange }: InputCalendarProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Deadline"
        value={value} // Use the value prop passed in
        onChange={onChange} // Directly pass the onChange handler
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
  )
}

export default InputCalendar
