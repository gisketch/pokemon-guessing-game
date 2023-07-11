import { Box } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const GamePanel = ({ children }: Props) => {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: '#FFFFFF55',
        borderRadius: '16px',
        backdropFilter: 'blur(75px)',
        height: '100%',
      }}
      paddingX={2}
      paddingY={1}
    >
      {children}
    </Box>
  )
}

export default GamePanel
