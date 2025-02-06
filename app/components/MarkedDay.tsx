import Badge from '@mui/material/Badge/Badge'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers'
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert'
import { Dayjs } from 'dayjs'

interface MarkedDayProps extends PickersDayProps<Dayjs> {
  highlightedDays?: Dayjs[]
}

function MarkedDay(props: MarkedDayProps) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props

  const isSelected =
    !outsideCurrentMonth &&
    highlightedDays.some((highlightedDay) => highlightedDay.isSame(day, 'day'))

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={
        isSelected ? (
          <CrisisAlertIcon fontSize="small" sx={{ color: '#F9982B' }} />
        ) : undefined
      }
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  )
}

export default MarkedDay
