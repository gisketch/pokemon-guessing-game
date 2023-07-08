import { Box, Stack } from '@mui/material'
import RandomPokemon from '../features/pokemon/RandomPokemon'

const PokemonGuess = () => {
  return (
    <Box height="100%" padding={2}>
      <Stack direction="column" alignItems="center" justifyItems="center">
        <RandomPokemon />
      </Stack>
    </Box>
  )
}

export default PokemonGuess
