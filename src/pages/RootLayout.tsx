import {
  CssBaseline,
  Container,
  Box,
  createTheme,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material'
import BlurBackground from '../components/BlurBackground'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: ['Clash Display', 'Roboto'].join(','),
  },
})

const RootLayout = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
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
          <Container maxWidth="lg">
            {isMobile ? (
              <Box width="100%" textAlign="center">
                Sorry, mobile version is still in progress.
              </Box>
            ) : (
              <Outlet />
            )}
          </Container>
        </div>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default RootLayout
