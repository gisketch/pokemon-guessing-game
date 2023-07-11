import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

type SliceState = {
  currentState: 'loading' | 'loaded' | 'guessed'
}

const initialState: SliceState = {
  currentState: 'loading',
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState: (
      state,
      action: PayloadAction<'loading' | 'loaded' | 'guessed'>
    ) => {
      state.currentState = action.payload
    },
  },
})

export const { setGameState } = gameSlice.actions

export const selectGameState = (state: RootState) => state.game.currentState

export default gameSlice.reducer
