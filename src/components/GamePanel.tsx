import { Box, Stack } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  position: 'left' | 'right'
}

const GamePanel = ({ children, position }: Props) => {
  return (
    <Stack
      direction="row"
      justifyContent={position === 'left' ? 'flex-start' : 'flex-end'}
    >
      <Box
        sx={{
          border: 1,
          borderColor: '#FFFFFF55',
          borderRadius: '16px',
          backdropFilter: 'blur(75px)',
          width: 225,
          minWidth: 200,
          height: '100%',
        }}
        paddingX={2}
        paddingY={1}
      >
        {children}
      </Box>
    </Stack>
  )
}

export default GamePanel
