import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

type SliceState = {
  difficulty: 'easy' | 'medium' | 'hard'
}

const initialState: SliceState = {
  difficulty: 'medium',
}

const gameQueueSlice = createSlice({
  name: 'gameQueue',
  initialState,
  reducers: {
    queueDifficulty: (
      state,
      action: PayloadAction<'easy' | 'medium' | 'hard'>
    ) => {
      state.difficulty = action.payload
    },
  },
})

export const { queueDifficulty } = gameQueueSlice.actions

export const selectGameQueue = (state: RootState) => state.gameQueue

export default gameQueueSlice.reducer
