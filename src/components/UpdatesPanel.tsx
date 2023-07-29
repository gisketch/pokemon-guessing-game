import { Box, List, ListItemText, Typography } from '@mui/material'
import updates from '../updates'

const UpdatesPanel = () => {
  return (
    <Box
      sx={{
        marginTop: 2,
        marginLeft: 2,
      }}
    >
      <Typography variant="h5">What's New?</Typography>
      {updates.map((update) => (
        <>
          <List dense>
            {update.updates.map((desc) => (
              <ListItemText primary={'- ' + desc} />
            ))}
          </List>
        </>
      ))}
    </Box>
  )
}

export default UpdatesPanel
