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
import { useAppDispatch } from '../redux/hooks'
import { useEffect } from 'react'
import { setIsMobile } from '../features/responsive/responsiveSlice'

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
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setIsMobile(isMobile))
  }, [isMobile])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BlurBackground />
      <Box
        sx={{
          background: '#000000BB',
          height: '100svh',
          backdropFilter: 'blur(75px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        <div>
          <NavBar />
          <Container maxWidth="lg">
            <Outlet />
          </Container>
        </div>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default RootLayout
