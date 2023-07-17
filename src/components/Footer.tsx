import { Box, Tooltip, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        textAlign: 'center',
        left: 0,
        bottom: 0,
        paddingTop: 4,
        paddingBottom: 2,
      }}
    >
      {/* currentDifficulty === 'easy' ? '#6fbf73' : currentDifficulty === 'medium'
      ? '#ffcd38' : currentDifficulty === 'hard' ? '#aa2e25' : '' */}
      <Typography variant="subtitle2">
        © 2023, Created by{' '}
        <a
          href="https://www.gisketch.com"
          style={{ textDecoration: 'none', color: '#ffcd38' }}
        >
          gisketch
        </a>
      </Typography>
      <Typography variant="subtitle2" fontWeight={400}>
        Enjoyed the game?{' '}
        <Tooltip title="GCash 09309118777">
          <a
            href="https://ko-fi.com/gisketch"
            style={{ color: '#6fbf73', fontWeight: 500 }}
          >
            Support my work
          </a>
        </Tooltip>{' '}
        | Found a bug?{' '}
        <a
          href="https://discord.gg/JcCeAD7DAy"
          style={{ color: '#aa2e25', fontWeight: 500 }}
        >
          Report it here
        </a>
      </Typography>
      <Typography variant="subtitle2" fontWeight={400} fontSize={12}>
        Built with ReactJS, MaterialUI, and Redux. Check the code at{' '}
        <a
          href="https://github.com/gisketch/pokemon-guessing-game"
          style={{ color: 'white', fontWeight: 500 }}
        >
          GitHub.
        </a>
      </Typography>
    </Box>
  )
}

export default Footer
