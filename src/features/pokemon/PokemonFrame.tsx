import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectGameState, setStartTime } from '../gameState/gameStateSlice'
import { selectPokemon } from './pokemonSlice'
import { motion } from 'framer-motion'
import pokeball from '../../assets/pokeball3.png'

const PokemonFrame = () => {
  const dispatch = useAppDispatch()

  const pokemon = useAppSelector(selectPokemon)
  const currentDifficulty = useAppSelector(selectGameState).difficulty

  let progress = useAppSelector(selectGameState).progress
  if (Number.isNaN(progress)) progress = 0
  const progressPercent = Math.floor(progress * 100)

  const containerRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const containerElement = containerRef.current
    const maskElement = maskRef.current

    if (containerElement && maskElement) {
      const height = containerElement.clientHeight
      const fillHeight = (progressPercent / 100) * height

      maskElement.style.clipPath = `inset(${height - fillHeight}px 0px 0px 0px)`
    }
  }, [progressPercent])

  const pokemonImage = pokemon.image

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: '300px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {pokemon.names.length === 0 ? (
        <motion.img
          src={pokeball}
          height={125}
          animate={{
            rotate: [0, 359, 365, 360],
            transition: {
              repeat: Infinity,
            },
          }}
          style={{
            position: 'absolute',
            zIndex: 5,
          }}
        />
      ) : null}
      <motion.div
        initial={{
          scale: 1,
        }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <img
          src={pokemonImage}
          height={300}
          onLoad={() => {
            dispatch(setStartTime())
          }}
          style={{
            filter: currentDifficulty === 'easy' ? '' : 'brightness(0%)',
            position: 'absolute',
            opacity: progress === 1 ? '0' : '1',
            zIndex: 1,
          }}
        />

        <motion.img
          src={pokemonImage}
          height={300}
          animate={{
            scale: progress === 1 ? [1.05, 1.1, 0] : 1,
            transition: {
              duration: 0.3,
              repeat: progress === 1 ? Infinity : 0,
              repeatType: 'loop',
            },
          }}
          style={{
            position: 'absolute',
            display:
              currentDifficulty === 'hard' && progress !== 1 ? 'none' : 'block',
            zIndex: 2,
            clipPath: 'inset(0px 0px 0px 0px)',
            transition: 'clip-path 0.05s ease-in-out',
          }}
          //@ts-ignore
          ref={maskRef}
        />

        <motion.img
          src={pokemonImage}
          height={300}
          style={{ filter: 'blur(100px)', zIndex: 0 }}
        />
      </motion.div>
    </div>
  )
}

export default PokemonFrame
