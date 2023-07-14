import { Leaderboard } from '@mui/icons-material'
import pokeballImage from '../assets/pokeball.png'
import { Container, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === '/'

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap={1} padding={1}>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{ textDecoration: 'none', color: 'white' }}
          >
            <span style={{ fontWeight: 300 }}>Who's that </span>
            <span style={{ fontWeight: 600 }}>Pokémon</span>
          </Typography>
          <img src={pokeballImage} style={{ height: '70px' }} />
        </Stack>
        <motion.div
          whileHover={{
            cursor: 'pointer',
            color: '#af52bf',
            transition: {
              duration: 0.1,
            },
          }}
        >
          {!isHome ? (
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              onClick={() => navigate('/')}
            >
              <Typography variant="h6">Play Again</Typography>
            </Stack>
          ) : (
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              onClick={() => navigate('/leaderboard')}
            >
              <Leaderboard fontSize="inherit" />
              <Typography variant="h6">Leaderboard</Typography>
            </Stack>
          )}
        </motion.div>
      </Stack>
    </Container>
  )
}

export default NavBar
