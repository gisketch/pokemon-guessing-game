import pokeballImage from '../assets/pokeball.png'
import { Container, Stack, Typography } from '@mui/material'

const NavBar = () => {
  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" gap={1} padding={1}>
        <Typography variant="h4" noWrap component="a">
          <span style={{ fontWeight: 300 }}>Who's that </span>
          <span style={{ fontWeight: 600 }}>Pokémon</span>
        </Typography>
        <img src={pokeballImage} style={{ height: '70px' }} />
      </Stack>
    </Container>
  )
}

export default NavBar
