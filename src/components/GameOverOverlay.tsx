import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Input,
  Stack,
  Typography,
} from '@mui/material'
import {
  completeGame,
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
import { selectPokemonIds } from '../features/pokemon/pokemonIdsSlice'

const GameOverOverlay = () => {
  const dispatch = useAppDispatch()
  const gameState = useAppSelector(selectGameState)
  const generations = useAppSelector(selectGameQueue).generations

  const totalPokemonsToGuess =
    useAppSelector(selectPokemonIds).pokemonIds.length

  const [leaderboardPrompt, setLeaderboardPrompt] = useState(false)
  const [sendingData, setSendingData] = useState(false)
  const [sentPrompt, setSentPrompt] = useState(false)
  const [sentMessage, setSentMessage] = useState('')

  const isGameOver = gameState.isGameOver
  const gameCompleted = gameState.completed

  const [name, setName] = useState('')

  useEffect(() => {
    if (gameState.hp <= 0) {
      dispatch(setGameOver(true))
    }
  }, [gameState.hp])

  useEffect(() => {
    if (gameState.guesses >= totalPokemonsToGuess) {
      dispatch(setGameOver(true))
      dispatch(completeGame())
    }
  }, [gameState.guesses])

  const handleJoinLeaderboard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLeaderboardPrompt(false)
    setSendingData(true)
    setSentPrompt(true)

    const playerData: PlayerData = {
      name: name,
      generations,
      difficulty: gameState.difficulty,
      score: gameState.score,
      guesses: gameState.guesses,
      maxStreak: gameState.max.streak,
      fastestGuess:
        gameState.max.timeGuessed === Infinity
          ? 60_000
          : gameState.max.timeGuessed,
    }

    console.log('Writing to leaderboard')

    writeToLeaderboard(playerData)
      .then(() => {
        setSentMessage('Score submitted!')
        setSendingData(false)
        resetGame(dispatch)
        setTimeout(() => {
          console.log('Wrote to leaderboard')
          setSentPrompt(false)
        }, 1000)
      })
      .catch(() => {
        console.log('Error')
        setSendingData(false)
        setSentPrompt(false)
        setSentMessage('An unexpected error occured :<')
        resetGame(dispatch)
      })
  }

  return (
    <>
      <Dialog open={sentPrompt}>
        <DialogTitle sx={{ background: 'black' }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            {sendingData && <CircularProgress size={18} color="inherit" />}
            <Typography variant="body1">
              {sendingData
                ? 'Be patient, Trainer! Your score is on its way to the leaderboard...'
                : sentMessage}
            </Typography>
          </Stack>
        </DialogTitle>
      </Dialog>
      <Dialog
        open={isGameOver || gameCompleted}
        // onClose={(handleClose)}
      >
        <DialogTitle sx={{ background: 'black' }}>
          {isGameOver && gameCompleted
            ? 'Congratulations, Pokémon Master!'
            : 'Game over'}
        </DialogTitle>
        <DialogContent sx={{ background: 'black' }}>
          <DialogContentText>
            {isGameOver && gameCompleted
              ? "Incredible! You've caught them all! Here's a look at your amazing stats:"
              : "Wow, what a game! You're out of Poké Balls now, but here's how you did:"}
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
              autoFocus
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
            <Button type="submit" variant="outlined" color="success">
              Join
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default GameOverOverlay
