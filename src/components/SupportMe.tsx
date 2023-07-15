import { Favorite } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'

interface Props {
  isMobile?: boolean
}

const SupportMe = ({ isMobile = false }: Props) => {
  return (
    <Stack
      marginTop={2}
      marginRight={2}
      alignItems={isMobile ? 'flex-start' : 'flex-end'}
    >
      <Typography variant="h6" fontSize={14} marginBottom={1}>
        Enjoying the game?
      </Typography>
      <Button
        color="success"
        variant="outlined"
        size="small"
        href="https://ko-fi.com/gisketch"
      >
        <Favorite sx={{ fontSize: 14, marginRight: 1 }} />
        Support Me
      </Button>
      <Typography variant="body1" fontSize={14} marginTop={1}>
        GCash 0930 911 8777
      </Typography>
    </Stack>
  )
}

export default SupportMe
