import { Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectGameState } from '../gameState/gameStateSlice'
import { useEffect, useState } from 'react'
import { skipPokemon } from '../../utils/gameActions'
import { selectPokemon } from '../pokemon/pokemonSlice'

const Timer = () => {
  const hp = useAppSelector(selectGameState).hp
  const startTime = useAppSelector(selectGameState).startTime
  const difficulty = useAppSelector(selectGameState).difficulty
  const currentPokemon = useAppSelector(selectPokemon).names

  const [remainingTime, setRemainingTime] = useState(15_000)

  let timerDuration = difficulty === 'hard' ? 10_000 : 15_000 // 10 seconds in milliseconds

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentPokemon.length === 0) return

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
        variant="h5"
        fontWeight={600}
        width={60}
        color={remainingTime <= 3000 ? `rgb(${225}, 40, 40)` : 'white'}
      >
        {(remainingTime / 1000).toFixed(2)}
      </Typography>
    )
  )
}

export default Timer
