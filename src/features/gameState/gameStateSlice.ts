import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

type SliceState = {
  initialized: boolean
  completed: boolean
  isGameOver: boolean
  hp: number
  difficulty: 'easy' | 'medium' | 'hard'
  score: number
  streak: number
  guesses: number
  progress: number
  startTime: number
  timeBonus: number
  timeGuessed: number
  scoring: {
    base: number
    time: number
    streak: number
  }
  max: {
    timeGuessed: number
    streak: number
  }
}

const initialState: SliceState = {
  initialized: false,
  completed: false,
  isGameOver: false,
  hp: 6,
  difficulty: 'medium',
  score: 0,
  streak: 0,
  guesses: 0,
  progress: 0,
  startTime: 0,
  timeBonus: 0,
  timeGuessed: 0,
  scoring: {
    base: 1_000,
    time: 0,
    streak: 0,
  },
  max: {
    timeGuessed: Infinity,
    streak: 0,
  },
}

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    addScore: (state) => {
      //Window time = 10 seconds
      state.timeGuessed = new Date().getTime() - state.startTime
      const timeWindow = 5
      let timeBonus = 0
      if (state.timeGuessed < timeWindow * 1000) {
        //If in 3 seconds window, get max bonus
        timeBonus = 1000
      } else {
        timeBonus = Math.max(
          0,
          Math.floor((5_000 + timeWindow * 2000 - state.timeGuessed) / 1000)
        )
        timeBonus *= 100
      }
      //Max streak of 5
      const maxStreak = 5
      let streakBonus = 0
      if (state.streak <= maxStreak) {
        streakBonus = state.streak * 100
      } else {
        streakBonus = maxStreak * 100
      }

      // Update max values
      state.max.timeGuessed = Math.min(state.max.timeGuessed, state.timeGuessed)

      state.guesses++
      state.scoring.time = timeBonus
      state.scoring.streak = streakBonus
      state.score += state.scoring.base + timeBonus + streakBonus
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload
    },
    addStreak: (state) => {
      state.streak++
      // Update max values
      state.max.streak = Math.max(state.max.streak, state.streak)
    },
    resetStreak: (state) => {
      state.streak = 0
    },
    resetAll: (state) => {
      return {
        ...initialState,
        completed: false,
        difficulty: state.difficulty,
        startTime: new Date().getTime(),
      }
    },
    setStartTime: (state) => {
      state.startTime = new Date().getTime()
    },
    decrementHp: (state) => {
      state.hp--
    },
    startGame: (state) => {
      state.initialized = true
    },
    setGameOver: (state, action: PayloadAction<boolean>) => {
      state.isGameOver = action.payload
    },
    setDifficulty: (
      state,
      action: PayloadAction<'easy' | 'medium' | 'hard'>
    ) => {
      state.difficulty = action.payload
    },
    completeGame: (state) => {
      state.completed = true
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
  decrementHp,
  startGame,
  setGameOver,
  setDifficulty,
  completeGame,
} = gameStateSlice.actions

export const selectGameState = (state: RootState) => state.gameState

export default gameStateSlice.reducer
