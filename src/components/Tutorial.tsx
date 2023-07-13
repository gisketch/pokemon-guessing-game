import { Box, Stack, Typography } from '@mui/material'
import ButtonKey from './ButtonKey'

const Tutorial = () => {
  return (
    <Box marginTop={2} marginLeft={2}>
      <Typography variant="h5" marginBottom={1}>
        Hotkeys
      </Typography>
      <Stack direction="column" gap={1}>
        <Typography variant="body1">
          Clear Guess - <ButtonKey>Del</ButtonKey>
        </Typography>
        <Typography variant="body1">
          Skip - <ButtonKey>Tab</ButtonKey>
        </Typography>
        <Typography variant="body1">
          Restart - <ButtonKey>Ctrl</ButtonKey>
          <ButtonKey>Space</ButtonKey>
        </Typography>
      </Stack>
    </Box>
  )
}

export default Tutorial
