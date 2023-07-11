import { useEffect, useRef } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { selectScore } from '../score/scoreSlice'
import { selectPokemon } from './pokemonSlice'
import { motion } from 'framer-motion'
import pokeball from '../../assets/pokeball3.png'

const PokemonFrame = () => {
  const pokemon = useAppSelector(selectPokemon)
  let progress = useAppSelector(selectScore).progress
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
      {pokemon.name === '' ? (
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

      <img
        src={pokemonImage}
        height={300}
        style={{
          filter: 'brightness(0%)',
          position: 'absolute',
          opacity: progress === 1 ? '0' : '1',
          zIndex: 1,
        }}
      />
      <motion.img
        src={pokemonImage}
        height={300}
        animate={{
          scale: progress === 1 ? [1, 1.025, 1] : 1,
          transition: {
            duration: 0.5,
            repeat: progress === 1 ? Infinity : 0,
            repeatType: 'loop',
          },
        }}
        style={{
          position: 'absolute',
          zIndex: 2,
          clipPath: 'inset(0px 0px 0px 0px)',
          transition: 'clip-path 0.2s ease-in-out',
        }}
        //@ts-ignore
        ref={maskRef}
      />
      <motion.img
        src={pokemonImage}
        height={300}
        style={{ filter: 'blur(100px)', zIndex: 0 }}
      />
    </div>
  )
}

export default PokemonFrame
