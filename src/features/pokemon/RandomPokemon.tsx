import { Box, Button, Input } from '@mui/material'
import { useGetPokemonByIdQuery } from '../../redux/services/pokemonApi'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectPokemonIds } from './pokemonIdsSlice'
import PokemonFrame from './PokemonFrame'
import { clearPokemon, selectPokemon, setPokemon } from './pokemonSlice'
import {
  resetStreak,
  addStreak,
  setProgress,
  setScore,
} from '../score/scoreSlice'

const RandomPokemon = () => {
  const [randomId, setRandomId] = useState('1')
  const [guess, setGuess] = useState('')

  const pokemonIds = useAppSelector(selectPokemonIds)
  const { data, error, isLoading } = useGetPokemonByIdQuery(randomId)

  const currentPokemon = useAppSelector(selectPokemon)

  const dispatch = useAppDispatch()

  const changePokemon = () => {
    dispatch(clearPokemon())
    const randomIndex = Math.floor(Math.random() * pokemonIds.length)
    setRandomId(pokemonIds[randomIndex].toString())
  }

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

  const handleGuessChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGuess(event.target.value)
  }

  const handleAnswer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setGuess('')

    if (guess.toLowerCase() === currentPokemon.name.toLowerCase()) {
      //CORRECT ANSWER!
      dispatch(setScore(100))
      dispatch(setProgress(0))
      dispatch(addStreak())
      changePokemon()
    } else {
      dispatch(resetStreak())
    }
  }

  useEffect(() => {
    if (data) {
      dispatch(setPokemon(data))
    }
  }, [data, dispatch])

  return (
    <>
      <Box height="100%">
        <div>{isLoading || error ? <p>Loading...</p> : <PokemonFrame />}</div>
      </Box>

      <form
        onSubmit={handleAnswer}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <Input
          value={guess}
          onChange={handleGuessChange}
          fullWidth
          size="medium"
          sx={{
            fontSize: '24px',
            textAlign: 'center',
          }}
        />
        <Button variant="outlined" color="success" type="submit">
          Guess
        </Button>
      </form>
    </>
  )
}

export default RandomPokemon
