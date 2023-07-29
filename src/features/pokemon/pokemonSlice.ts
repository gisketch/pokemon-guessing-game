import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Pokemon } from '../../utils/types'
import { RootState } from '../../redux/store'

type SliceState = {
  pokemon: {
    id: string
    names: string[]
    image: string
  }
}

const initialState: SliceState = { pokemon: { id: '', names: [], image: '' } }

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemon: (state, action: PayloadAction<Pokemon>) => {
      return { pokemon: action.payload }
    },
    clearPokemon: (state) => {
      return initialState
    },
  },
})

export const { setPokemon, clearPokemon } = pokemonSlice.actions

export const selectPokemon = (state: RootState) => state.pokemon.pokemon

export default pokemonSlice.reducer
