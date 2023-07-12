import {
  Button,
  ButtonGroup,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { clearGuess } from '../guess/guessSlice'
import { setRandomId } from '../pokemon/pokemonIdsSlice'
import { clearPokemon } from '../pokemon/pokemonSlice'
import { resetAll } from '../score/scoreSlice'
import { useState } from 'react'
import { selectGameState } from './gameSlice'
import {
  QuestionMarkOutlined,
  Replay,
  ResetTvOutlined,
  RestartAltOutlined,
} from '@mui/icons-material'

const GameSettings = () => {
  const dispatch = useAppDispatch()
  const gameState = useAppSelector(selectGameState)

  const [difficultyOnQueue, setDifficultyOnQueue] = useState<
    'easy' | 'medium' | 'hard'
  >('medium')

  const resetGame = () => {
    dispatch(setRandomId())
    dispatch(clearPokemon())
    dispatch(resetAll())
    dispatch(clearGuess())
  }

  return (
    <>
      <Divider />
      <Typography
        variant="h6"
        sx={{
          fontSize: 18,
          marginBlock: 1,
        }}
      >
        Settings
      </Typography>
      <ToggleButtonGroup
        orientation="horizontal"
        value={difficultyOnQueue}
        onChange={(event, val) => {
          setDifficultyOnQueue(val)
        }}
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
          onClick={resetGame}
        >
          <Replay />
        </Button>
      </ButtonGroup>
    </>
  )
}

export default GameSettings
