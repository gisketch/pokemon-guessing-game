import { Box, Stack } from '@mui/material'
import PokemonContainer from '../features/pokemon/PokemonContainer'

const PokemonGuess = () => {
  return (
    <Box height="100%" padding={2}>
      <Stack direction="column" alignItems="center" justifyItems="center">
        <PokemonContainer />
      </Stack>
    </Box>
  )
}

export default PokemonGuess
