import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectGameState, setDifficulty } from '../gameState/gameStateSlice'

const GameSettings = () => {
  const dispatch = useAppDispatch()
  const gameState = useAppSelector(selectGameState)
  const gameInitialized = gameState.initialized
  const currentDifficulty = gameState.difficulty

  const handleGameDifficulty = (
    _: any,
    difficulty: 'easy' | 'medium' | 'hard'
  ) => {
    if (difficulty) dispatch(setDifficulty(difficulty))
  }

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="h6"
          sx={{
            fontSize: 18,
            marginBlock: 1,
          }}
        >
          Settings
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: 18,
            marginBlock: 1,
            textTransform: 'uppercase',
          }}
          color={
            currentDifficulty === 'easy'
              ? '#6fbf73'
              : currentDifficulty === 'medium'
              ? '#ffcd38'
              : currentDifficulty === 'hard'
              ? '#aa2e25'
              : ''
          }
        >
          {currentDifficulty}
        </Typography>
      </Stack>
      <ToggleButtonGroup
        orientation="horizontal"
        value={gameState.difficulty}
        onChange={handleGameDifficulty}
        fullWidth
        exclusive
        sx={{ width: '100%' }}
        disabled={gameInitialized}
      >
        <ToggleButton value="easy" size="small">
          Easy
        </ToggleButton>
        <ToggleButton value="medium" size="small">
          Medium
        </ToggleButton>
        <ToggleButton value="hard" size="small">
          Hard
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  )
}

export default GameSettings
