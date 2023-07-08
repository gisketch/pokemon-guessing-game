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
    setScore: (state, action: PayloadAction<number>) => {
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
  },
})

export const { setScore, setProgress, addStreak, resetStreak } =
  scoreSlice.actions

export const selectScore = (state: RootState) => state.score

export default scoreSlice.reducer
