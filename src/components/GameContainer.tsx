import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import GenerationPicker from '../features/generations/GenerationPicker'
import Score from '../features/gameState/Score'
import PokemonGuess from './PokemonGuess'
import GamePanel from './GamePanel'
import GameSettings from '../features/game/GameSettings'
import HealthPoints from '../features/gameState/HealthPoints'
import GameOverOverlay from './GameOverOverlay'
import GameStart from './GameStart'
import { useAppSelector } from '../redux/hooks'
import { selectGameState } from '../features/gameState/gameStateSlice'
import Tutorial from './Tutorial'
import GameButtons from '../features/game/GameButtons'
import { selectResponsive } from '../features/responsive/responsiveSlice'
import Timer from '../features/timer/Timer'
import SupportMe from './SupportMe'

const GameContainer = () => {
  const gameState = useAppSelector(selectGameState)
  const isMobile = useAppSelector(selectResponsive).isMobile

  return (
    <>
      <GameOverOverlay />
      <Grid container>
        {!isMobile && (
          <Grid item xs={3}>
            <GamePanel position="left">
              <GenerationPicker />
            </GamePanel>
          </Grid>
        )}

        <Grid item xs={isMobile ? 12 : 6} minHeight={500}>
          {gameState.isGameOver ? (
            <></>
          ) : gameState.initialized ? (
            <PokemonGuess />
          ) : (
            <GameStart />
          )}
        </Grid>

        {!isMobile && (
          <Grid item xs={3}>
            <GamePanel position="right">
              <Box marginBottom={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6">HP</Typography>
                  <Timer />
                </Stack>
                <HealthPoints />
              </Box>
              <Score />
              <Divider />
              <GameSettings />
              <GameButtons />
            </GamePanel>
          </Grid>
        )}
      </Grid>

      {isMobile ? (
        <></>
      ) : (
        <Stack direction="row" justifyContent="space-between">
          <Tutorial />
          <SupportMe />
        </Stack>
      )}
    </>
  )
}

export default GameContainer
