import { Box, Stack } from '@mui/material'
import PokemonContainer from '../features/pokemon/PokemonContainer'
import { selectResponsive } from '../features/responsive/responsiveSlice'
import { useAppSelector } from '../redux/hooks'
import MobileGameInfo from './MobileGameInfo'

const PokemonGuess = () => {
  const isMobile = useAppSelector(selectResponsive).isMobile

  return (
    <Box height="100%" padding={2}>
      {isMobile && <MobileGameInfo />}
      <Stack direction="column" alignItems="center" justifyItems="center">
        <PokemonContainer />
      </Stack>
    </Box>
  )
}

export default PokemonGuess
