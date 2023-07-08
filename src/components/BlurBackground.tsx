import { Grid } from '@mui/material'
import pokeball2 from '../assets/pokeball2.png'
import pokeball3 from '../assets/pokeball3.png'

const BlurBackground = () => {
  return (
    <Grid container overflow="hidden" position="fixed" zIndex={-1} spacing={25}>
      <Grid item xs={4}>
        <img src={pokeball3} height={350} />
      </Grid>
      <Grid item xs={4}>
        <img src={pokeball2} height={350} />
      </Grid>
      <Grid item xs={4}>
        <img src={pokeball3} height={350} />
      </Grid>
      <Grid item xs={4}>
        <img src={pokeball2} height={350} />
      </Grid>
      <Grid item xs={4}>
        <img src={pokeball3} height={350} />
      </Grid>
      <Grid item xs={4}>
        <img src={pokeball2} height={350} />
      </Grid>
    </Grid>
  )
}

export default BlurBackground
