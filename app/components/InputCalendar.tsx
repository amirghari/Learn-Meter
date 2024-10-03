'use client'
import React from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { Dayjs } from 'dayjs'

// interface InputCalendarProps {
//   field: Dayjs
// }

const InputCalendar = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Deadline"
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
