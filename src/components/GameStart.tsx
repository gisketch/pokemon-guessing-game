import { Button, Stack } from '@mui/material'
import ButtonKey from './ButtonKey'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { startPokemonGame } from '../utils/gameActions'
import { selectResponsive } from '../features/responsive/responsiveSlice'

const GameStart = () => {
  const dispatch = useAppDispatch()

  const isMobile = useAppSelector(selectResponsive).isMobile

  const startGame = () => {
    startPokemonGame(dispatch)
  }

  useEffect(() => {
    if (!isMobile) {
      function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.keyCode === 32) {
          event.preventDefault()
          startGame()
        }
      }

      //@ts-ignore
      document.addEventListener('keydown', handleKeyDown)

      // Don't forget to clean up
      return function cleanup() {
        //@ts-ignore
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isMobile])

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      {isMobile ? (
        <Button
          variant="outlined"
          color="success"
          sx={{ fontSize: 24, padding: 2 }}
          onClick={startGame}
        >
          Start Game
        </Button>
      ) : (
        <motion.p
          animate={{
            y: [0, -10, 0],
            transition: {
              repeat: Infinity,
              duration: 2,
            },
          }}
        >
          Press <ButtonKey>Space</ButtonKey> to start
        </motion.p>
      )}
    </Stack>
  )
}

export default GameStart
