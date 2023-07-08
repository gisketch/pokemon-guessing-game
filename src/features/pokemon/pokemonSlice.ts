import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Pokemon } from '../../redux/types'
import { RootState } from '../../redux/store'

type SliceState = {
  pokemon: {
    name: string
    image: string
  }
}

const initialState: SliceState = { pokemon: { name: '', image: '' } }

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemon: (state, action: PayloadAction<Pokemon>) => {
      return { pokemon: action.payload }
    },
    clearPokemon: (state) => {
      return { pokemon: { name: '', image: '' } }
    },
  },
})

export const { setPokemon, clearPokemon } = pokemonSlice.actions

export const selectPokemon = (state: RootState) => state.pokemon.pokemon

export default pokemonSlice.reducer
