import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

type SliceState = {
  score: number
  streak: number
  progress: number
}

const initialState: SliceState = {
  score: 0,
  streak: 0,
  progress: 0,
}

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<number>) => {
      const scoreToAdd = action.payload
      state.score += scoreToAdd
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload
    },
    addStreak: (state) => {
      state.streak++
    },
    resetStreak: (state) => {
      state.streak = 0
    },
    resetAll: (state) => {
      return initialState
    },
  },
})

export const { addScore, setProgress, addStreak, resetStreak, resetAll } =
  scoreSlice.actions

export const selectScore = (state: RootState) => state.score

export default scoreSlice.reducer
