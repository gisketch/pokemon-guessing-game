import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

type SliceState = {
  startTime: number
  endTime: number
}

const initialState: SliceState = { startTime: 0, endTime: 0 }

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setStartTime: (state) => {
      const startTime = new Date().getTime()
      return { ...state, startTime }
    },
    setEndTime: (state) => {
      const endTime = new Date().getTime()
      return { ...state, endTime }
    },
  },
})

export const { setStartTime, setEndTime } = timerSlice.actions

export const selectTimer = (state: RootState) => state.timer

export default timerSlice.reducer
