import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useAppDispatch } from '../../redux/hooks'
import { clearGuess } from '../guess/guessSlice'
import { setRandomId } from '../pokemon/pokemonIdsSlice'
import { clearPokemon } from '../pokemon/pokemonSlice'
import { resetAll } from '../score/scoreSlice'
import { useState } from 'react'

const GameSettings = () => {
  const dispatch = useAppDispatch()

  const [mode, setMode] = useState()
  //TODO: Get Mode Type

  const resetGame = () => {
    dispatch(setRandomId())
    dispatch(clearPokemon())
    dispatch(resetAll())
    dispatch(clearGuess())
  }

  return (
    <>
      <ToggleButtonGroup
        orientation="horizontal"
        value="medium"
        // onChange={handleGenerations}
        sx={{ marginBottom: 1, width: '100%' }}
      >
        <ToggleButton value="easy" size="small">
          Easy
        </ToggleButton>
        <ToggleButton value="medium" size="small">
          Medium
        </ToggleButton>
        <ToggleButton value="easy" size="small">
          Hard
        </ToggleButton>
      </ToggleButtonGroup>
      <Button
        onKeyDown={(e) => e.preventDefault()}
        variant="outlined"
        color="secondary"
        onClick={resetGame}
      >
        Reset
      </Button>
    </>
  )
}

export default GameSettings
