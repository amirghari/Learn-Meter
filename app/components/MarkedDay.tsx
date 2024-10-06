import Badge from '@mui/material/Badge/Badge'
import { PickersDay } from '@mui/x-date-pickers'
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert'

function MarkedDay(props: any) {
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
