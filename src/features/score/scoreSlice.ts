import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

type SliceState = {
  score: number
  streak: number
  progress: number
  startTime: number
  timeBonus: number
}

const initialState: SliceState = {
  score: 0,
  streak: 0,
  progress: 0,
  startTime: 0,
  timeBonus: 0,
}

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    addScore: (state) => {
      const baseScore = 1_000
      //Window time = 10 seconds
      const timeGuessed = new Date().getTime() - state.startTime
      let timeBonus = 0
      if (timeGuessed < 3000) {
        //If in 3 seconds window, get max bonus
        timeBonus = 1000
      } else {
        timeBonus = Math.max(0, Math.floor((13_000 - timeGuessed) / 10))
      }
      //Max streak of 5
      const maxStreak = 5
      let streakBonus = 0
      if (state.streak <= maxStreak) {
        streakBonus = state.streak * 100
      } else {
        streakBonus = maxStreak * 100
      }
      console.log(timeBonus, 'time')
      console.log(streakBonus, 'streak')
      state.score += baseScore + timeBonus + streakBonus
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
    setStartTime: (state) => {
      state.startTime = new Date().getTime()
    },
  },
})

export const {
  addScore,
  setProgress,
  addStreak,
  resetStreak,
  resetAll,
  setStartTime,
} = scoreSlice.actions

export const selectScore = (state: RootState) => state.score

export default scoreSlice.reducer
