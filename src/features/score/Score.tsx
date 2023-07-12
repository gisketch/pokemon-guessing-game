import { Box, Button, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { resetAll, selectScore } from './scoreSlice'
import { setRandomId } from '../pokemon/pokemonIdsSlice'
import { clearPokemon } from '../pokemon/pokemonSlice'
import { clearGuess } from '../guess/guessSlice'
import ScoreText from './ScoreText'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'
import getRandomInteger from '../../utils/getRandomInteger'

const Score = () => {
  const score = useAppSelector(selectScore)
  const dispatch = useAppDispatch()

  const scoreAnim = useAnimationControls()
  const streakAnim = useAnimationControls()
  const timeAnim = useAnimationControls()

  const resetGame = () => {
    dispatch(setRandomId())
    dispatch(clearPokemon())
    dispatch(resetAll())
    dispatch(clearGuess())
  }

  useEffect(() => {
    if (score.score === 0) return
    scoreAnim.start({
      y: [40, 0],
      scale: [1, 1.15],
      opacity: [1, 0],
      x: getRandomInteger(-50, 25),
      transition: {
        duration: 0.5,
      },
    })
    streakAnim.start({
      y: [30, -10],
      scale: [1, 1.2],
      opacity: [1, 0],
      x: getRandomInteger(-30, 0),
      transition: {
        duration: 0.5,
      },
    })
    timeAnim.start({
      y: [30, -10],
      scale: [1, 1.25],
      opacity: [1, 0],
      x: getRandomInteger(-50, 30),
      transition: {
        duration: 0.5,
      },
    })
  }, [score.score])

  return (
    <>
      <Box
        marginBottom={1}
        position="absolute"
        sx={{
          zIndex: -1,
          translate: -250,
          textAlign: 'right',
        }}
      >
        <motion.div animate={scoreAnim} style={{ opacity: 0 }}>
          <ScoreText>+ {score.scoring.base}</ScoreText>
        </motion.div>
        <motion.div
          animate={streakAnim}
          style={{
            opacity: 0,
            display: score.streak <= 1 ? 'none' : 'block',
            color: '#33eb91',
          }}
        >
          <ScoreText>
            + {score.scoring.streak} ({score.streak} streak)
          </ScoreText>
        </motion.div>
        <motion.div
          animate={timeAnim}
          style={{
            opacity: 0,
            display: score.scoring.time === 0 ? 'none' : 'block',
            color: '#33bfff',
          }}
        >
          <ScoreText>+ {score.scoring.time} (time bonus)</ScoreText>
        </motion.div>
      </Box>
      <Box marginBottom={1}>
        <Typography variant="h6">Score</Typography>
        <Typography variant="body1">{score.score}</Typography>
      </Box>
      <Box marginBottom={1}>
        <Typography variant="h6">Streak</Typography>
        <Typography variant="body1">{score.streak}</Typography>
      </Box>
      <Box marginBottom={1}>
        <Typography variant="h6">Max Streak</Typography>
        <Typography variant="body1">{score.max.streak}</Typography>
      </Box>
      <Box marginBottom={1}>
        <Typography variant="h6">Guess Time</Typography>
        <Typography variant="body1">{score.timeGuessed / 1000} s</Typography>
      </Box>
      <Box marginBottom={1}>
        <Typography variant="h6">Fastest Guess</Typography>
        <Typography variant="body1">
          {score.max.timeGuessed === Infinity
            ? 0
            : score.max.timeGuessed / 1000}{' '}
          s
        </Typography>
      </Box>

      <Button
        onKeyDown={(e) => e.preventDefault()}
        variant="outlined"
        color="secondary"
        onClick={resetGame}
      >
        Reset
      </Button>
    </>
  )
}

export default Score
