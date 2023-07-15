import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

interface SliceState {
  isMobile: boolean
}

const initialState: SliceState = {
  isMobile: false,
}

const responsiveSlice = createSlice({
  name: 'responsive',
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload
    },
  },
})

export const { setIsMobile } = responsiveSlice.actions

export const selectResponsive = (state: RootState) => state.responsive

export default responsiveSlice.reducer
