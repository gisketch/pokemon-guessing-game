import {
  Box,
  Button,
  CircularProgress,
  Input,
  Stack,
  Typography,
} from '@mui/material'
import { useGetPokemonByIdQuery } from '../../redux/services/pokemonApi'
import { KeyboardEvent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectPokemonIds } from './pokemonIdsSlice'
import PokemonFrame from './PokemonFrame'
import { selectPokemon, setPokemon } from './pokemonSlice'
import { setProgress } from '../gameState/gameStateSlice'
import { motion, useAnimationControls } from 'framer-motion'
import {
  addCurrentGuess,
  backspaceGuess,
  clearGuess,
  selectGuess,
  setGuess,
} from '../guess/guessSlice'
import getRandomInteger from '../../utils/getRandomInteger'
import { guessPokemon, resetGame, skipPokemon } from '../../utils/gameActions'
import { selectResponsive } from '../responsive/responsiveSlice'

const PokemonContainer = () => {
  const dispatch = useAppDispatch()

  const isMobile = useAppSelector(selectResponsive).isMobile

  const pokemonId = useAppSelector(selectPokemonIds)
  const randomId = pokemonId.currentId
  const currentGuess = useAppSelector(selectGuess)

  const { data, error, isLoading } = useGetPokemonByIdQuery(randomId)

  const currentPokemon = useAppSelector(selectPokemon)

  const animControls = useAnimationControls()
  const pokeFrameControls = useAnimationControls()

  useEffect(() => {
    if (currentGuess !== '') {
      handleAnswer()
    }
  }, [currentGuess])

  useEffect(() => {
    if (!isMobile) {
      function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        if (event.ctrlKey) {
          event.preventDefault()
          switch (event.key) {
            case 'h':
              console.log('hint')
              break
            case ' ':
              resetGame(dispatch)
              break
            default:
              break
          }
        } else {
          if (
            (event.keyCode >= 65 && event.keyCode <= 90) || // Alphabet keys (A-Z)
            (event.keyCode >= 48 && event.keyCode <= 57) || // Numeric keys (0-9)
            event.keyCode === 32 || // Spacebar
            event.keyCode === 59 || // Colon
            event.key === 'Backspace' || // Backspace key
            event.key === 'Delete' || // Delete key
            event.key === 'Tab' || //Period
            event.key === "'" || // Apostrophe key
            event.key === '-' || // Hyphen
            event.key === '.' //Period
          ) {
            event.preventDefault()

            if (event.key === 'Backspace') {
              // Remove the last character from the guess state
              dispatch(backspaceGuess())
            } else if (event.key === 'Delete') {
              // Remove all
              dispatch(clearGuess())
            } else if (event.key === 'Tab') {
              // Skip
              skipPokemon(dispatch)
            } else {
              const pressedKey = event.key
              dispatch(addCurrentGuess(pressedKey))
            }
          }
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

  useEffect(() => {
    let progress = 0
    const pokemonName = currentPokemon.name
    const minLength = Math.min(currentGuess.length, pokemonName.length)

    for (let i = 0; i < minLength; i++) {
      if (currentGuess[i].toLowerCase() === pokemonName[i].toLowerCase()) {
        progress++
      } else {
        break
      }
    }

    //Animate
    pokeFrameControls.start({
      x: [0, getRandomInteger(-2, 2), 0],
      y: [0, getRandomInteger(-2, 2), 0],
      transition: {
        duration: 0.2,
      },
    })

    dispatch(setProgress(progress / pokemonName.length))
  }, [currentGuess])

  useEffect(() => {
    if (data) {
      dispatch(setPokemon(data))
    }
  }, [data, dispatch])

  const handleAnswer = () => {
    if (currentGuess.toLowerCase() === currentPokemon.name.toLowerCase()) {
      animControls.start({
        scale: [1, 1.25, 1],
        color: ['rgb(24,150,24)', 'rgb(255,255,255)'],
        transition: {
          duration: 0.15,
        },
      })
      guessPokemon(dispatch)
    }
  }

  return (
    <>
      <Box
        height="100%"
        marginBottom={2}
        sx={{
          userSelect: 'none',
          msUserSelect: 'none',
          MozUserSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        <motion.div animate={pokeFrameControls}>
          {isLoading || error ? (
            <CircularProgress color="success" />
          ) : (
            <PokemonFrame />
          )}
        </motion.div>
      </Box>
      <motion.div
        animate={animControls}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100vw',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          opacity: 1,
          userSelect: 'none',
          msUserSelect: 'none',
          MozUserSelect: 'none',
        }}
      >
        {isMobile ? (
          <Stack direction="row" gap={2}>
            <Input
              color="secondary"
              sx={{
                width: '100%',
                textAlign: 'center',
                fontSize: 24,
                fontWeight: 700,
                border: 'none',
              }}
              placeholder="Type here"
              value={currentGuess}
              onChange={(e) => dispatch(setGuess(e.target.value))}
            ></Input>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                if (currentPokemon.name !== '') skipPokemon(dispatch)
              }}
            >
              SKIP
            </Button>
          </Stack>
        ) : (
          <Typography
            variant="h4"
            position="absolute"
            textAlign="center"
            fontWeight={600}
            fontSize={45}
            noWrap
          >
            {currentGuess}
          </Typography>
        )}

        <Typography
          variant="h2"
          zIndex={-2}
          position={isMobile ? 'absolute' : 'relative'}
          textAlign="center"
          fontWeight={800}
          fontSize={100}
          color="#FFFFFF11"
          noWrap
        >
          {currentGuess}
        </Typography>
      </motion.div>
    </>
  )
}

export default PokemonContainer
