import { SkipNext, QuestionMarkOutlined, Replay } from '@mui/icons-material'
import { Button, ButtonGroup, Tooltip } from '@mui/material'
import { resetGame, skipPokemon } from '../../utils/gameActions'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectPokemon } from '../pokemon/pokemonSlice'

const GameButtons = () => {
  const dispatch = useAppDispatch()

  const currentPokemon = useAppSelector(selectPokemon)

  const handleSkip = () => {
    if (currentPokemon.names.length !== 0) skipPokemon(dispatch)
  }
  return (
    <ButtonGroup variant="outlined" fullWidth>
      <Tooltip title="Tab" arrow>
        <Button
          onKeyDown={(e) => e.preventDefault()}
          variant="outlined"
          color="error"
          onClick={handleSkip}
        >
          <SkipNext />
        </Button>
      </Tooltip>

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

      <Tooltip title="Ctrl + Space" arrow>
        <Button
          onKeyDown={(e) => e.preventDefault()}
          variant="outlined"
          color="success"
          onClick={() => resetGame(dispatch)}
        >
          <Replay />
        </Button>
      </Tooltip>
    </ButtonGroup>
  )
}

export default GameButtons
