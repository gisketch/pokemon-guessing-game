import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

const gen1 = Array.from({ length: 151 }, (_, index) => (index + 1).toString())
const gen2 = Array.from({ length: 100 }, (_, index) => (index + 152).toString())
const gen3 = Array.from({ length: 135 }, (_, index) => (index + 252).toString())
const gen4 = Array.from({ length: 107 }, (_, index) => (index + 387).toString())
const gen5 = Array.from({ length: 156 }, (_, index) => (index + 494).toString())
const gen6 = Array.from({ length: 72 }, (_, index) => (index + 650).toString())
const gen7 = Array.from({ length: 86 }, (_, index) => (index + 722).toString())
const gen8 = Array.from({ length: 96 }, (_, index) => (index + 810).toString())
const gen9 = Array.from({ length: 105 }, (_, index) => (index + 906).toString())

type SliceState = {
  currentId: string
  pokemonIds: string[]
  guessedIds: string[]
}

const initialState: SliceState = {
  currentId: '1',
  pokemonIds: Array.from({ length: 386 }, (_, index) => (index + 1).toString()),
  guessedIds: [],
}

const pokemonIdsSlice = createSlice({
  name: 'pokemonIds',
  initialState,
  reducers: {
    setPokemonIdsFromGens: (state, action: PayloadAction<string[]>) => {
      const selectedGenerations = action.payload
      const selectedGenIds = selectedGenerations.flatMap((gen) => {
        switch (gen) {
          case '1':
            return gen1
          case '2':
            return gen2
          case '3':
            return gen3
          case '4':
            return gen4
          case '5':
            return gen5
          case '6':
            return gen6
          case '7':
            return gen7
          case '8':
            return gen8
          case '9':
            return gen9
          default:
            return []
        }
      })
      return {
        ...state,
        pokemonIds: [...selectedGenIds],
        // pokemonIds: ['772'],
      }
    },
    setRandomId: (state) => {
      const pokemonToGuess = state.pokemonIds.filter(
        (id) => !state.guessedIds.includes(id)
      )

      if (pokemonToGuess.length > 0) {
        const randomIndex = Math.floor(Math.random() * pokemonToGuess.length)
        const newId = pokemonToGuess[randomIndex].toString()
        return {
          ...state,
          currentId: newId,
        }
      }

      return state
    },
    excludeGuessedId: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        guessedIds: [...state.guessedIds, action.payload],
      }
    },
  },
})

export const { setPokemonIdsFromGens, setRandomId, excludeGuessedId } =
  pokemonIdsSlice.actions

export const selectPokemonIds = (state: RootState) => state.pokemonIds

export default pokemonIdsSlice.reducer
