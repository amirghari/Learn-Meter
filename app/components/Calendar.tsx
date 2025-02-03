'use client'

import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers'
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton'
import axios from 'axios'
import { useEffect } from 'react'
import MarkedDay from './MarkedDay'

export default function Calendar() {
  const requestAbortController = React.useRef<AbortController | null>(null)
  const [highlightedDays, setHighlightedDays] = React.useState<Dayjs[]>([])

  const fetchHighlightedDays = async (date: dayjs.Dayjs) => {
    try {
      const response = await axios.get('/api/goals')
      const deadlines = response.data.map((deadline: string) => dayjs(deadline))

      // Filter deadlines for the current month and year
      const filteredDeadlines = deadlines.filter((deadline: Dayjs) =>
        deadline.isSame(date, 'month'),
      )

      setHighlightedDays(filteredDeadlines)
    } catch (error) {
      console.error('Error fetching deadlines:', error.response || error)
    }
  }

  useEffect(() => {
    fetchHighlightedDays(dayjs()) // Fetch deadlines for the current month
    return () => requestAbortController.current?.abort()
  }, [])

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort()
    }
    setHighlightedDays([])
    fetchHighlightedDays(date) // Fetch deadlines for the newly selected month
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: (dayProps) => (
            <MarkedDay {...dayProps} highlightedDays={highlightedDays} />
          ),
        }}
        sx={{
          width: '80%',
          '@media (max-width: 640px)': {
            width: '100%',
          },
          '& .MuiPickersCalendarHeader-root': {
            justifyContent: 'flex-start',
            padding: '16px 0',
          },
          '& .MuiPickersDay-dayWithMargin': {
            margin: 'auto',
          },
          '& .MuiDayCalendar-weekContainer': {
            justifyContent: 'space-between',
          },
          '& .MuiDayCalendar-weekDayLabel': {
            flex: '1',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '.8rem',
            padding: '10px 0',
          },
          '& .MuiPickersDay-root': {
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            padding: '5px',
            '&:hover': {
              backgroundColor: 'rgba(249, 152, 43, 0.13)',
              color: 'black',
            },
          },
          '& .Mui-selected': {
            backgroundColor: '#557C56 !important',
            color: 'white',
          },
          '& .MuiPickersDay-root.Mui-selected': {
            borderRadius: '50%',
          },
        }}
      />
    </LocalizationProvider>
  )
}
