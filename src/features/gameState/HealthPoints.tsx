import { Box, Stack } from '@mui/material'
import { useAppSelector } from '../../redux/hooks'
import { selectGameState } from './gameStateSlice'
import pokeball from '../../assets/pokeballPixel.png'
import { AnimatePresence, motion } from 'framer-motion'
import getRandomInteger from '../../utils/getRandomInteger'

const HealthPoints = () => {
  const hp = useAppSelector(selectGameState).hp

  let renderedHp

  if (hp <= 0) {
    renderedHp = null
  } else {
    renderedHp = Array.from({ length: hp }, (_, index) => (
      <motion.img
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: 18, rotate: getRandomInteger(-20, 20) }}
        key={index}
        src={pokeball}
        alt="Pokeball"
      />
    ))
  }

  return (
    <Box>
      <Stack direction="row" position="absolute" zIndex={2} gap={1}>
        <AnimatePresence>{renderedHp}</AnimatePresence>
      </Stack>
      <Stack direction="row" gap={1} zIndex={-1}>
        {Array.from({ length: 6 }, (_, index) => (
          <img
            key={index}
            src={pokeball}
            alt="Pokeball"
            style={{ filter: 'grayscale(100%) brightness(0.7)' }}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default HealthPoints
