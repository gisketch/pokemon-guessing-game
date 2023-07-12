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
} from '../features/score/scoreSlice'

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
  dispatch(clearGuess())
}

export const resetGame = (dispatch: any, difficulty: any) => {
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
