import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { selectScore } from '../features/score/scoreSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { resetGame } from '../utils/gameActions'
import prettyMilliseconds from 'pretty-ms'

const GameOverOverlay = () => {
  const dispatch = useAppDispatch()
  const score = useAppSelector(selectScore)
  return (
    <>
      <Dialog
        open={score.hp <= 0}
        // onClose={(handleClose)}
      >
        <DialogTitle sx={{ background: 'black' }}>Game over</DialogTitle>
        <DialogContent sx={{ background: 'black' }}>
          <DialogContentText>
            You're out of PokeBalls. You got a total of{' '}
            <span style={{ fontWeight: 700 }}>{score.score}</span> score,
            guessed <span style={{ fontWeight: 700 }}>{score.guesses}</span>{' '}
            pokemon, a max streak of{' '}
            <span style={{ fontWeight: 700 }}>{score.max.streak}</span>, and
            your fastest guess took{' '}
            <span style={{ fontWeight: 700 }}>
              {prettyMilliseconds(score.max.timeGuessed, {
                secondsDecimalDigits: 2,
              })}
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
