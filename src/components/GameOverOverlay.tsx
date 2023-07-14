import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Input,
  Stack,
} from '@mui/material'
import {
  selectGameState,
  setGameOver,
} from '../features/gameState/gameStateSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { resetGame } from '../utils/gameActions'
import prettyMilliseconds from 'pretty-ms'
import { useEffect, useState } from 'react'
import { selectGameQueue } from '../features/game/gameQueueSlice'
import { writeToLeaderboard } from '../services/leaderboardApi'
import { PlayerData } from '../utils/types'

const GameOverOverlay = () => {
  const dispatch = useAppDispatch()
  const gameState = useAppSelector(selectGameState)
  const generations = useAppSelector(selectGameQueue).generations

  const [leaderboardPrompt, setLeaderboardPrompt] = useState(false)

  const isGameOver = gameState.isGameOver

  const [name, setName] = useState('')

  useEffect(() => {
    if (gameState.hp <= 0) {
      dispatch(setGameOver(true))
    }
  }, [gameState.hp])

  const handleJoinLeaderboard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const playerData: PlayerData = {
      name: name,
      generations,
      difficulty: gameState.difficulty,
      score: gameState.score,
      guesses: gameState.guesses,
      maxStreak: gameState.max.streak,
      fastestGuess:
        gameState.max.timeGuessed === Infinity
          ? undefined
          : gameState.max.timeGuessed,
    }

    writeToLeaderboard(playerData)

    resetGame(dispatch)
    setLeaderboardPrompt(false)
  }

  return (
    <>
      <Dialog
        open={isGameOver}
        // onClose={(handleClose)}
      >
        <DialogTitle sx={{ background: 'black' }}>Game over</DialogTitle>
        <DialogContent sx={{ background: 'black' }}>
          <DialogContentText>
            Wow, what a game! You're out of Poké Balls now, but here's how you
            did:
          </DialogContentText>
          <Stack sx={{ marginBlock: 2 }}>
            <span>
              Total Score:{' '}
              <span style={{ fontWeight: 700 }}>{gameState.score}</span>
            </span>
            <span>
              Pokémon Guessed:{' '}
              <span style={{ fontWeight: 700 }}>{gameState.guesses}</span>
            </span>
            <span>
              Max Streak:{' '}
              <span style={{ fontWeight: 700 }}>{gameState.max.streak}</span>
            </span>
            <span>
              Fastest Guess:{' '}
              <span style={{ fontWeight: 700 }}>
                {prettyMilliseconds(
                  gameState.max.timeGuessed === Infinity
                    ? 0
                    : gameState.max.timeGuessed,
                  {
                    secondsDecimalDigits: 2,
                  }
                )}
              </span>
            </span>
          </Stack>
          <Divider />
          <DialogContentText marginTop={1}>
            Do you want to immortalize your achievement on the Leaderboard?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ background: 'black' }}>
          <Button color="error" onClick={() => resetGame(dispatch)}>
            No Thanks
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={() => setLeaderboardPrompt(true)}
            autoFocus
          >
            JOIN THE LEADERBOARD
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={leaderboardPrompt}>
        <DialogTitle sx={{ background: 'black' }}>What's your name</DialogTitle>
        <form onSubmit={handleJoinLeaderboard}>
          <DialogContent sx={{ background: 'black' }}>
            <Input
              placeholder="Trainer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              inputProps={{ required: true, minLength: 3, maxLength: 20 }}
            />
          </DialogContent>
          <DialogActions sx={{ background: 'black' }}>
            <Button
              type="button"
              color="error"
              onClick={() => setLeaderboardPrompt(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="outlined" color="success" autoFocus>
              Join
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default GameOverOverlay
