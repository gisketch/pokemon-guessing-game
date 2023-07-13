import { Grid } from '@mui/material'
import GenerationPicker from '../features/generations/GenerationPicker'
import Score from '../features/score/Score'
import PokemonGuess from './PokemonGuess'
import GamePanel from './GamePanel'
import GameSettings from '../features/game/GameSettings'
import HealthPoints from '../features/score/HealthPoints'
import GameOverOverlay from './GameOverOverlay'
import GameStart from './GameStart'
import { useAppSelector } from '../redux/hooks'
import { selectScore } from '../features/score/scoreSlice'

const GameContainer = () => {
  const gameInitialized = useAppSelector(selectScore).initialized

  return (
    <>
      <GameOverOverlay />
      <Grid container>
        <Grid item xs={3}>
          <GamePanel>
            <GenerationPicker />
          </GamePanel>
        </Grid>
        <Grid item xs={6}>
          {gameInitialized ? <PokemonGuess /> : <GameStart />}
        </Grid>
        <Grid item xs={3}>
          <GamePanel>
            <HealthPoints />
            <Score />
            <GameSettings />
          </GamePanel>
        </Grid>
      </Grid>
    </>
  )
}

export default GameContainer
