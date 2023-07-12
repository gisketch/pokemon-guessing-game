import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

type SliceState = {
  difficulty: 'easy' | 'medium' | 'hard'
}

const initialState: SliceState = {
  difficulty: 'medium',
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameMode: (state, action: PayloadAction<SliceState>) => {
      state = action.payload
    },
  },
})

export const { setGameMode } = gameSlice.actions

export const selectGameState = (state: RootState) => state.game

export default gameSlice.reducer
