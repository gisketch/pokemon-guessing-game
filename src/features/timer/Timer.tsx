import { Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectScore } from '../score/scoreSlice'
import { useEffect, useState } from 'react'
import { skipPokemon } from '../../utils/gameActions'
import { selectPokemon } from '../pokemon/pokemonSlice'

const Timer = () => {
  const hp = useAppSelector(selectScore).hp
  const startTime = useAppSelector(selectScore).startTime
  const difficulty = useAppSelector(selectScore).difficulty
  const currentPokemon = useAppSelector(selectPokemon).name

  const [remainingTime, setRemainingTime] = useState(15_000)

  let timerDuration = difficulty === 'hard' ? 10_000 : 15_000 // 10 seconds in milliseconds

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!currentPokemon) return

    if (difficulty !== 'easy') {
      const intervalId = setInterval(() => {
        const currentTime = Date.now()
        const elapsedTime = currentTime - startTime
        const timeRemaining = timerDuration - elapsedTime

        if (timeRemaining <= 0) {
          clearInterval(intervalId)
          setRemainingTime(0)
          if (hp > 0) skipPokemon(dispatch)
        } else {
          setRemainingTime(timeRemaining)
        }
      }, 10) // Update the timer every 1 millisecond

      return () => clearInterval(intervalId) // Cleanup the interval on component unmount
    }
  }, [startTime])

  const showTimer = difficulty !== 'easy' && hp > 0 && currentPokemon

  return (
    showTimer && (
      <Typography
        variant="h4"
        fontWeight={600}
        width={100}
        color={remainingTime <= 3000 ? `rgb(${225}, 40, 40)` : 'white'}
      >
        {(remainingTime / 1000).toFixed(2)}
      </Typography>
    )
  )
}

export default Timer
