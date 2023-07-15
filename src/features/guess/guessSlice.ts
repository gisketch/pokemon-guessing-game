import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

type SliceState = string

const initialState: SliceState = ''

const guessSlice = createSlice({
  name: 'guess',
  initialState,
  reducers: {
    addCurrentGuess: (state, action: PayloadAction<string>) => {
      return (state + action.payload).replace('  ', ' ')
    },
    backspaceGuess: (state) => {
      return state.slice(0, -1)
    },
    clearGuess: (state) => {
      return ''
    },
    setGuess: (state, action: PayloadAction<string>) => {
      return action.payload
    },
  },
})

export const { addCurrentGuess, backspaceGuess, clearGuess, setGuess } =
  guessSlice.actions

export const selectGuess = (state: RootState) => state.guess

export default guessSlice.reducer
