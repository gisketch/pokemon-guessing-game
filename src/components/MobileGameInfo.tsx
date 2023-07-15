import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { selectGameState } from '../features/gameState/gameStateSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import HealthPoints from '../features/gameState/HealthPoints'
import Timer from '../features/timer/Timer'
import { resetGame } from '../utils/gameActions'

const MobileGameInfo = () => {
  const gameState = useAppSelector(selectGameState)
  const dispatch = useAppDispatch()

  return (
    <>
      <Stack
        direction="row"
        borderRadius="8px"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={1}
      >
        <HealthPoints />
        <Button
          variant="outlined"
          color="success"
          onClick={() => resetGame(dispatch)}
        >
          RESET
        </Button>
      </Stack>
      <Divider />
      <Stack
        marginTop={1}
        direction="row"
        borderRadius="8px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="body1" textAlign="left">
          Score: {gameState.score} ({gameState.guesses})
        </Typography>
        <Typography variant="body1" textAlign="left">
          Streak: {gameState.streak} ({gameState.max.streak})
        </Typography>
      </Stack>
      <Box
        sx={{
          position: 'absolute',
        }}
      >
        <Timer />
      </Box>
    </>
  )
}

export default MobileGameInfo
