import { Box, Stack, Typography } from '@mui/material'
import { useGetPokemonByIdQuery } from '../../redux/services/pokemonApi'
import { KeyboardEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectPokemonIds, setRandomId } from './pokemonIdsSlice'
import PokemonFrame from './PokemonFrame'
import { clearPokemon, selectPokemon, setPokemon } from './pokemonSlice'
import {
  resetStreak,
  addStreak,
  setProgress,
  addScore,
} from '../score/scoreSlice'

const RandomPokemon = () => {
  const randomId = useAppSelector(selectPokemonIds).currentId

  const [guess, setGuess] = useState('')
  const { data, error, isLoading } = useGetPokemonByIdQuery(randomId)

  const currentPokemon = useAppSelector(selectPokemon)

  const dispatch = useAppDispatch()

  const changePokemon = () => {
    dispatch(setRandomId())
    dispatch(clearPokemon())
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        handleAnswer()
      }
    }

    //@ts-ignore
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      //@ts-ignore
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [guess, currentPokemon.name])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
      if (
        (event.keyCode >= 65 && event.keyCode <= 90) || // Alphabet keys (A-Z)
        event.keyCode === 32 || // Spacebar
        event.key === 'Backspace' || // Backspace key
        event.key === "'" || // Apostrophe key
        event.key === '-'
      ) {
        event.preventDefault()

        if (event.key === 'Backspace') {
          // Remove the last character from the guess state
          setGuess((prevGuess) => prevGuess.slice(0, -1))
        } else {
          const pressedKey = event.key
          setGuess((prevGuess) => prevGuess + pressedKey)
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
  }, [])

  useEffect(() => {
    changePokemon()
    dispatch(setProgress(0))
  }, [])

  useEffect(() => {
    let progress = 0
    const pokemonName = currentPokemon.name
    const minLength = Math.min(guess.length, pokemonName.length)

    for (let i = 0; i < minLength; i++) {
      if (guess[i].toLowerCase() === pokemonName[i].toLowerCase()) {
        progress++
      } else {
        break
      }
    }

    dispatch(setProgress(progress / pokemonName.length))
  }, [guess])

  useEffect(() => {
    if (data) {
      dispatch(setPokemon(data))
    }
  }, [data, dispatch])

  const handleAnswer = () => {
    if (guess.toLowerCase() === currentPokemon.name.toLowerCase()) {
      dispatch(addScore(100))
      dispatch(setProgress(0))
      dispatch(addStreak())
      changePokemon()
    } else {
      dispatch(resetStreak())
    }
    setGuess('')
  }

  return (
    <>
      <Box height="100%" marginBottom={2}>
        <div>{isLoading || error ? <p>Loading...</p> : <PokemonFrame />}</div>
      </Box>
      <Stack
        maxWidth="100vw"
        overflow="hidden"
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          position: 'relative',
        }}
      >
        <Typography
          variant="h4"
          position="absolute"
          textAlign="center"
          fontWeight={800}
          fontSize={45}
          noWrap
        >
          {guess}
        </Typography>
        <Typography
          variant="h2"
          zIndex={-2}
          position="relative"
          textAlign="center"
          fontWeight={800}
          fontSize={100}
          color="#FFFFFF22"
          noWrap
        >
          {guess}
        </Typography>
      </Stack>
    </>
  )
}

export default RandomPokemon
