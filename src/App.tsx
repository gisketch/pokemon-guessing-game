import {
  Box,
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
} from '@mui/material'
import NavBar from './components/NavBar'
import BlurBackground from './components/BlurBackground'
import GameContainer from './components/GameContainer'
import Footer from './components/Footer'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: ['Clash Display', 'Roboto'].join(','),
  },
})

function App() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  console.log(isMobile)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BlurBackground />
      <Box
        sx={{
          background: '#000000BB',
          height: '100vh',
          backdropFilter: 'blur(75px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <NavBar />
          {isMobile ? (
            <Box
              sx={{
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: 4,
              }}
            >
              Sorry, the mobile version is still in progress. Please use a
              desktop in the meantime.
            </Box>
          ) : (
            <Container maxWidth="lg">
              <GameContainer />
            </Container>
          )}
        </div>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
