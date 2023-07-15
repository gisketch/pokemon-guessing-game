import { Box, Button, Divider } from '@mui/material'
import GameSettings from '../features/game/GameSettings'
import GenerationPicker from '../features/generations/GenerationPicker'

const MobileNavbar = () => {
  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: '#000000FF',
        height: '100%',
        padding: 2,
      }}
    >
      <GenerationPicker />
      <GameSettings />
      <Box
        sx={{
          paddingBlock: 2,
        }}
      >
        <Divider />
      </Box>
      <Button
        color="secondary"
        variant="outlined"
        fullWidth
        href="/leaderboard"
      >
        Leaderboard
      </Button>
    </Box>
  )
}

export default MobileNavbar
