import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

type SliceState = string[]

const initialState: SliceState = ['1', '2', '3']

const generationsSlice = createSlice({
  name: 'generations',
  initialState,
  reducers: {
    setGenerations: (state, action: PayloadAction<string[]>) => {
      return action.payload
    },
  },
})

export const { setGenerations } = generationsSlice.actions

export const selectGenerations = (state: RootState) => state.generations

export default generationsSlice.reducer
