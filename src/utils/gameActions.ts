import { clearGuess } from '../features/guess/guessSlice'
import { setRandomId } from '../features/pokemon/pokemonIdsSlice'
import { clearPokemon } from '../features/pokemon/pokemonSlice'
import {
  addScore,
  addStreak,
  decrementHp,
  resetAll,
  resetStreak,
  setProgress,
  startGame,
} from '../features/score/scoreSlice'
import { store } from '../redux/store'

const changePokemon = (dispatch: any) => {
  dispatch(setProgress(0))
  dispatch(clearPokemon())
  dispatch(clearGuess())
  dispatch(setRandomId())
}

export const initializeGame = (dispatch: any) => {
  dispatch(setProgress(0))
  dispatch(setRandomId())
  dispatch(clearPokemon())
  dispatch(resetAll('medium'))
  dispatch(startGame())
  dispatch(clearGuess())
}

export const startPokemonGame = (dispatch: any) => {
  dispatch(startGame())
}

export const resetGame = (dispatch: any) => {
  const difficulty = store.getState().gameQueue.difficulty
  dispatch(setRandomId())
  dispatch(clearPokemon())
  dispatch(resetAll(difficulty))
  dispatch(clearGuess())
}

export const guessPokemon = (dispatch: any) => {
  dispatch(addScore())
  dispatch(addStreak())
  setTimeout(() => changePokemon(dispatch), 300)
}

export const skipPokemon = (dispatch: any) => {
  dispatch(resetStreak())
  dispatch(decrementHp())
  changePokemon(dispatch)
}
