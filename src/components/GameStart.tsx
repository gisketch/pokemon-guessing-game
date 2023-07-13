import { Stack } from '@mui/material'
import ButtonKey from './ButtonKey'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useAppDispatch } from '../redux/hooks'
import { startPokemonGame } from '../utils/gameActions'

const GameStart = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
      if (event.keyCode === 32) {
        event.preventDefault()
        startPokemonGame(dispatch)
      }
    }

    //@ts-ignore
    document.addEventListener('keydown', handleKeyDown)

    // Don't forget to clean up
    return function cleanup() {
      //@ts-ignore
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
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
    </Stack>
  )
}

export default GameStart
