import { Box, Typography } from '@mui/material'
import { useAppSelector } from '../../redux/hooks'
import { selectGameState } from './gameStateSlice'
import ScoreText from './ScoreText'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'
import getRandomInteger from '../../utils/getRandomInteger'
import prettyMilliseconds from 'pretty-ms'

const Score = () => {
  const gameState = useAppSelector(selectGameState)

  const scoreAnim = useAnimationControls()
  const streakAnim = useAnimationControls()
  const timeAnim = useAnimationControls()

  useEffect(() => {
    if (gameState.score === 0) return
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
  }, [gameState.score])

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
          <ScoreText>+ {gameState.scoring.base}</ScoreText>
        </motion.div>
        <motion.div
          animate={streakAnim}
          style={{
            opacity: 0,
            display: gameState.streak <= 1 ? 'none' : 'block',
            color: '#33eb91',
          }}
        >
          <ScoreText>
            + {gameState.scoring.streak} ({gameState.streak} streak)
          </ScoreText>
        </motion.div>
        <motion.div
          animate={timeAnim}
          style={{
            opacity: 0,
            display: gameState.scoring.time === 0 ? 'none' : 'block',
            color: '#33bfff',
          }}
        >
          <ScoreText>+ {gameState.scoring.time} (time bonus)</ScoreText>
        </motion.div>
      </Box>
      <Box marginBottom={1}>
        <Typography variant="h6">Score</Typography>
        <Typography variant="body1">{gameState.score}</Typography>
      </Box>
      <Box marginBottom={1}>
        <Typography variant="h6">Streak</Typography>
        <Typography variant="body1">{gameState.streak}</Typography>
      </Box>
      <Box marginBottom={1}>
        <Typography variant="h6">Max Streak</Typography>
        <Typography variant="body1">{gameState.max.streak}</Typography>
      </Box>
      <Box marginBottom={1}>
        <Typography variant="h6">Guess Time</Typography>
        <Typography variant="body1">
          {prettyMilliseconds(gameState.timeGuessed, {
            secondsDecimalDigits: 2,
          })}
        </Typography>
      </Box>
      <Box marginBottom={1}>
        <Typography variant="h6">Fastest Guess</Typography>
        <Typography variant="body1">
          {prettyMilliseconds(
            gameState.max.timeGuessed === Infinity
              ? 0
              : gameState.max.timeGuessed,
            { secondsDecimalDigits: 2 }
          )}
        </Typography>
      </Box>
    </>
  )
}

export default Score
