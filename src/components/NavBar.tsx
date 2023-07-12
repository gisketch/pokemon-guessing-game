import pokeballImage from '../assets/pokeball.png'
import { Container, Stack, Typography } from '@mui/material'
import Timer from '../features/timer/Timer'

const NavBar = () => {
  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap={1} padding={1}>
          <Typography variant="h4" noWrap component="a">
            <span style={{ fontWeight: 300 }}>Who's that </span>
            <span style={{ fontWeight: 600 }}>Pokémon</span>
          </Typography>
          <img src={pokeballImage} style={{ height: '70px' }} />
        </Stack>
        <Timer />
      </Stack>
    </Container>
  )
}

export default NavBar
