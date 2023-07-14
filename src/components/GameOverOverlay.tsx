import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { selectGameState } from '../features/gameState/gameStateSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { resetGame } from '../utils/gameActions'
import prettyMilliseconds from 'pretty-ms'

const GameOverOverlay = () => {
  const dispatch = useAppDispatch()
  const gameState = useAppSelector(selectGameState)
  return (
    <>
      <Dialog
        open={gameState.hp <= 0}
        // onClose={(handleClose)}
      >
        <DialogTitle sx={{ background: 'black' }}>Game over</DialogTitle>
        <DialogContent sx={{ background: 'black' }}>
          <DialogContentText>
            You're out of PokeBalls. You got a total of{' '}
            <span style={{ fontWeight: 700 }}>{gameState.score}</span> score,
            guessed <span style={{ fontWeight: 700 }}>{gameState.guesses}</span>{' '}
            pokemon, a max streak of{' '}
            <span style={{ fontWeight: 700 }}>{gameState.max.streak}</span>, and
            your fastest guess took{' '}
            <span style={{ fontWeight: 700 }}>
              {prettyMilliseconds(
                gameState.max.timeGuessed === Infinity
                  ? 5000
                  : gameState.max.timeGuessed,
                {
                  secondsDecimalDigits: 2,
                }
              )}
            </span>
            .
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ background: 'black' }}>
          <Button
            color="secondary"
            onClick={() => resetGame(dispatch)}
            autoFocus
          >
            Try Again
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default GameOverOverlay
