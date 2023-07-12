import { Box, Typography } from '@mui/material'
import { useAppSelector } from '../../redux/hooks'
import { selectScore } from './scoreSlice'
import ScoreText from './ScoreText'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'
import getRandomInteger from '../../utils/getRandomInteger'
import prettyMilliseconds from 'pretty-ms'

const Score = () => {
  const score = useAppSelector(selectScore)

  const scoreAnim = useAnimationControls()
  const streakAnim = useAnimationControls()
  const timeAnim = useAnimationControls()

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
        <Typography variant="body1">
          {prettyMilliseconds(score.timeGuessed, { secondsDecimalDigits: 2 })}
        </Typography>
      </Box>
      <Box marginBottom={1}>
        <Typography variant="h6">Fastest Guess</Typography>
        <Typography variant="body1">
          {prettyMilliseconds(
            score.max.timeGuessed === Infinity ? 0 : score.max.timeGuessed,
            { secondsDecimalDigits: 2 }
          )}
        </Typography>
      </Box>
    </>
  )
}

export default Score
