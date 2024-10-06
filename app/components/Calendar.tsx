'use client'

import * as React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'

export default function Calendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        sx={{
          width: '80%', // Calendar width adjustment
          '& .MuiPickersCalendarHeader-root': {
            justifyContent: 'center',
            padding: '16px 0', // Add more height to the header
          },
          '& .MuiPickersDay-dayWithMargin': {
            margin: 'auto', // Center days
          },
          '& .MuiDayCalendar-weekContainer': {
            justifyContent: 'space-between', // Evenly space weekdays
          },
          '& .MuiDayCalendar-weekDayLabel': {
            flex: '1', // Equal space for each weekday label
            textAlign: 'center', // Center-align labels
            fontWeight: 'bold', // Bold weekday labels
            fontSize: '.8rem', // Slightly increase font size for weekdays
            padding: '10px 0', // Add height to weekday labels
          },
          '& .MuiPickersDay-root': {
            borderRadius: '50%', // Keep days circular
            width: '45px', // Increase width of day cells
            height: '45px', // Increase height of day cells
            padding: '5px', // Add a bit of padding for spacing
            '&:hover': {
              backgroundColor: 'rgba(249, 152, 43, 0.13)', // Change hover color to orange
              color: 'black', // White text on hover
            },
          },
          '& .Mui-selected': {
            backgroundColor: '#F9982B !important', // Use orange for selected day
            color: 'white', // White text for selected day
          },
          '& .MuiPickersDay-root.Mui-selected': {
            borderRadius: '50%', // Ensure selected day is circular
          },
        }}
      />
    </LocalizationProvider>
  )
}
