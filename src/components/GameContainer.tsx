import { Grid } from '@mui/material'
import GenerationPicker from '../features/generations/GenerationPicker'
import Score from '../features/score/Score'
import PokemonGuess from './PokemonGuess'

const GameContainer = () => {
  return (
    <Grid container>
      <Grid item xs={3} md={2}>
        <GenerationPicker />
      </Grid>
      <Grid item xs={6} md={8}>
        <PokemonGuess />
      </Grid>
      <Grid item xs={3} md={2}>
        <Score />
      </Grid>
    </Grid>
  )
}

export default GameContainer
