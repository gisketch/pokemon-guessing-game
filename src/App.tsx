import {
  Box,
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material'
import NavBar from './components/NavBar'
import BlurBackground from './components/BlurBackground'
import GameContainer from './components/GameContainer'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: ['Clash Display', 'Roboto'].join(','),
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BlurBackground />
      <Box
        sx={{
          background: '#000000BB',
          height: '100vh',
          backdropFilter: 'blur(75px)',
        }}
      >
        <NavBar />
        <Container maxWidth="xl">
          <GameContainer />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
