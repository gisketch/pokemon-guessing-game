import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useState } from 'react'
import gen1 from '../../assets/gen1.png'
import gen2 from '../../assets/gen2.png'
import gen3 from '../../assets/gen3.png'
import gen4 from '../../assets/gen4.png'
import gen5 from '../../assets/gen5.png'
import gen6 from '../../assets/gen6.png'
import gen7 from '../../assets/gen7.png'
import gen8 from '../../assets/gen8.png'
import gen9 from '../../assets/gen9.png'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectGenerations, setGenerations } from './generationsSlice'
import {
  selectPokemonIds,
  setPokemonIdsFromGens,
} from '../pokemon/pokemonIdsSlice'

const generations = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

const genIcons = [gen1, gen2, gen3, gen4, gen5, gen6, gen7, gen8, gen9]
const genColors = ['primary', 'success', 'error']

const GenerationPicker = () => {
  const generationsPicked = useAppSelector(selectGenerations)
  const dispatch = useAppDispatch()

  const handleGenerations = (
    event: React.MouseEvent<HTMLElement>,
    newGens: string[]
  ) => {
    if (newGens.length > 0) {
      dispatch(setGenerations(newGens))
      dispatch(setPokemonIdsFromGens(newGens))
    }
  }
  return (
    <Box
      sx={{ border: 1, borderColor: '#FFFFFF55', borderRadius: '16px' }}
      paddingX={2}
      paddingY={1}
    >
      <Typography variant="h6" marginBottom={1}>
        Generations
      </Typography>

      <ToggleButtonGroup
        orientation="vertical"
        value={generationsPicked}
        onChange={handleGenerations}
        sx={{ marginBottom: 1, width: '100%' }}
      >
        {generations.map((gen) => (
          <ToggleButton
            fullWidth
            //@ts-ignore
            color={genColors[Number(gen) % 3]}
            key={gen}
            value={gen}
            aria-label={gen}
            size="small"
            sx={{ height: '48px' }}
          >
            <Typography
              variant="body1"
              component="a"
              sx={{
                textTransform: 'none',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Gen {gen}
              <img src={genIcons[Number(gen) - 1]} height={48} />
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  )
}

export default GenerationPicker
