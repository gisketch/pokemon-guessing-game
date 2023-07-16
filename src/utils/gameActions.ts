import { clearGuess } from '../features/guess/guessSlice'
import {
  excludeGuessedId,
  setPokemonIdsFromGens,
  setRandomId,
} from '../features/pokemon/pokemonIdsSlice'
import { clearPokemon } from '../features/pokemon/pokemonSlice'
import {
  addScore,
  addStreak,
  decrementHp,
  resetAll,
  resetStreak,
  setGameOver,
  setProgress,
  setStartTime,
  startGame,
} from '../features/gameState/gameStateSlice'
import { store } from '../redux/store'

const changePokemon = (dispatch: any) => {
  dispatch(setProgress(0))
  dispatch(setStartTime())
  dispatch(clearPokemon())
  dispatch(clearGuess())
  dispatch(setRandomId())
}

export const initializeGame = (dispatch: any) => {
  dispatch(setProgress(0))
  dispatch(resetAll())
  dispatch(startGame())
}

export const startPokemonGame = (dispatch: any) => {
  resetGame(dispatch)
  dispatch(startGame())
}

export const resetGame = (dispatch: any) => {
  dispatch(resetAll())
  dispatch(setGameOver(false))
  const generations = store.getState().gameQueue.generations
  dispatch(setPokemonIdsFromGens(generations))
  dispatch(setRandomId())
  dispatch(clearPokemon())
  dispatch(clearGuess())
}

export const guessPokemon = (dispatch: any) => {
  dispatch(excludeGuessedId(store.getState().pokemon.pokemon.id.toString()))
  dispatch(addScore())
  dispatch(addStreak())
  setTimeout(() => changePokemon(dispatch), 300)
}

export const skipPokemon = (dispatch: any) => {
  dispatch(resetStreak())
  dispatch(decrementHp())
  changePokemon(dispatch)
}
