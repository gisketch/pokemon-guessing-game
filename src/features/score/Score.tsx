import { Box, Button, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { resetAll, selectScore } from './scoreSlice'
import { setRandomId } from '../pokemon/pokemonIdsSlice'
import { clearPokemon } from '../pokemon/pokemonSlice'
import { clearGuess } from '../guess/guessSlice'

const Score = () => {
  const score = useAppSelector(selectScore)
  const dispatch = useAppDispatch()

  const resetGame = () => {
    dispatch(setRandomId())
    dispatch(clearPokemon())
    dispatch(resetAll())
    dispatch(clearGuess())
  }

  return (
    <Box
      sx={{
        border: 1,
        borderColor: '#FFFFFF55',
        borderRadius: '16px',
        backdropFilter: 'blur(75px)',
      }}
      paddingX={2}
      paddingY={1}
      height="100%"
    >
      <Typography variant="h6">Score</Typography>
      <Typography variant="body1">{score.score}</Typography>
      <Typography variant="h6">Streak</Typography>
      <Typography variant="body1">{score.streak}</Typography>

      <Button variant="outlined" color="secondary" onClick={resetGame}>
        Reset
      </Button>
    </Box>
  )
}

export default Score
