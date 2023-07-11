import { configureStore } from '@reduxjs/toolkit'
import { pokemonApi } from './services/pokemonApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import pokemonReducer from '../features/pokemon/pokemonSlice'
import pokemonIdsReducer from '../features/pokemon/pokemonIdsSlice'
import generationsReducer from '../features/generations/generationsSlice'
import scoreReducer from '../features/score/scoreSlice'
import gameReducer from '../features/game/gameSlice'
import guessReducer from '../features/guess/guessSlice'

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonIds: pokemonIdsReducer,
    generations: generationsReducer,
    guess: guessReducer,
    score: scoreReducer,
    game: gameReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})

setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
