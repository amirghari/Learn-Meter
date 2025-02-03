import { TextField, MenuItem } from '@mui/material'

interface Props {
  value: string
  onChange: (value: string) => void
}

const StatusInput = ({ value, onChange }: Props) => {
  return (
    <TextField
      id="goal-status"
      select
      label="Select Status"
      value={value} // Ensuring controlled behavior
      onChange={(e) => onChange(e.target.value)} // Pass the selected value correctly
      helperText="What stage are you at?"
      sx={{
        width: '100%',
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
    >
      <MenuItem value="JUST_SET">Just Set</MenuItem>
      <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
      <MenuItem value="POSTPONED">Postponed</MenuItem>
      <MenuItem value="DONE">Achieved</MenuItem>
    </TextField>
  )
}

export default StatusInput
