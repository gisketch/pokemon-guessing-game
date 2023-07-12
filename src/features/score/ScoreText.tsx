import { Typography } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const ScoreText = ({ children }: Props) => {
  return (
    <>
      <Typography variant="h6" noWrap>
        {children}
      </Typography>
    </>
  )
}

export default ScoreText
