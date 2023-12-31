import { configureStore } from '@reduxjs/toolkit'
import { pokemonApi } from './services/pokemonApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import pokemonReducer from '../features/pokemon/pokemonSlice'
import pokemonIdsReducer from '../features/pokemon/pokemonIdsSlice'
import gameStateReducer from '../features/gameState/gameStateSlice'
import gameQueueReducer from '../features/game/gameQueueSlice'
import guessReducer from '../features/guess/guessSlice'
import responsiveReducer from '../features/responsive/responsiveSlice'

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonIds: pokemonIdsReducer,
    guess: guessReducer,
    gameState: gameStateReducer,
    gameQueue: gameQueueReducer,
    responsive: responsiveReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
  devTools: process.env.NODE_ENV === 'development',
})

setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
