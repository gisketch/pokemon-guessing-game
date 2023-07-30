import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

type SliceState = {
  difficulty: 'easy' | 'medium' | 'hard'
  generations: string[]
}

const initialState: SliceState = {
  difficulty: 'medium',
  generations: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
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
    queueGenerations: (state, action: PayloadAction<string[]>) => {
      state.generations = action.payload
    },
  },
})

export const { queueDifficulty, queueGenerations } = gameQueueSlice.actions

export const selectGameQueue = (state: RootState) => state.gameQueue

export default gameQueueSlice.reducer
