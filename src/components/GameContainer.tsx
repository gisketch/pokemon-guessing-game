import { Grid } from '@mui/material'
import GenerationPicker from '../features/generations/GenerationPicker'
import Score from '../features/score/Score'
import PokemonGuess from './PokemonGuess'
import GamePanel from './GamePanel'
import GameSettings from '../features/game/GameSettings'
import HealthPoints from '../features/score/HealthPoints'

const GameContainer = () => {
  return (
    <Grid container>
      <Grid item xs={3}>
        <GamePanel>
          <GenerationPicker />
        </GamePanel>
      </Grid>
      <Grid item xs={6}>
        <PokemonGuess />
      </Grid>
      <Grid item xs={3}>
        <GamePanel>
          <HealthPoints />
          <Score />
          <GameSettings />
        </GamePanel>
      </Grid>
    </Grid>
  )
}

export default GameContainer
