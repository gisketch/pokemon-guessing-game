import { Box, Typography } from '@mui/material'
import { useAppSelector } from '../../redux/hooks'
import { selectScore } from './scoreSlice'

const Score = () => {
  const score = useAppSelector(selectScore)

  return (
    <Box
      sx={{ border: 1, borderColor: '#FFFFFF55', borderRadius: '16px' }}
      paddingX={2}
      paddingY={1}
      height="100%"
    >
      <Typography variant="h6">Score</Typography>
      <Typography variant="body1">{score.score}</Typography>
      <Typography variant="h6">Streak</Typography>
      <Typography variant="body1">{score.streak}</Typography>
    </Box>
  )
}

export default Score
