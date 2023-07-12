import {
  Button,
  ButtonGroup,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { queueDifficulty, selectGameQueue } from './gameQueueSlice'
import { QuestionMarkOutlined, Replay, SkipNext } from '@mui/icons-material'
import { resetGame, skipPokemon } from '../../utils/gameActions'
import { selectScore } from '../score/scoreSlice'
import { selectPokemon } from '../pokemon/pokemonSlice'

const GameSettings = () => {
  const dispatch = useAppDispatch()
  const currentDifficulty = useAppSelector(selectScore).difficulty
  const gameQueue = useAppSelector(selectGameQueue)
  const currentPokemon = useAppSelector(selectPokemon)

  const handleQueueDifficulty = (
    _: any,
    difficulty: 'easy' | 'medium' | 'hard'
  ) => {
    if (difficulty) dispatch(queueDifficulty(difficulty))
  }

  const handleSkip = () => {
    if (currentPokemon.name) skipPokemon(dispatch)
  }

  return (
    <>
      <Divider />
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
        value={gameQueue.difficulty}
        onChange={handleQueueDifficulty}
        fullWidth
        exclusive
        sx={{ width: '100%' }}
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

      <ButtonGroup variant="outlined" fullWidth>
        <Button
          onKeyDown={(e) => e.preventDefault()}
          variant="outlined"
          color="error"
          onClick={handleSkip}
        >
          <SkipNext />
        </Button>
        <Button
          onKeyDown={(e) => e.preventDefault()}
          variant="outlined"
          color="info"
          onClick={() => {
            console.log('hint')
          }}
        >
          <QuestionMarkOutlined />
        </Button>
        <Button
          onKeyDown={(e) => e.preventDefault()}
          variant="outlined"
          color="success"
          onClick={() => resetGame(dispatch, gameQueue.difficulty)}
        >
          <Replay />
        </Button>
      </ButtonGroup>
    </>
  )
}

export default GameSettings
