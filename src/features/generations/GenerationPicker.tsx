import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Box,
} from '@mui/material'
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
import { queueGenerations, selectGameQueue } from '../game/gameQueueSlice'
import { selectGameState } from '../gameState/gameStateSlice'

const generations = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

const genIcons = [gen1, gen2, gen3, gen4, gen5, gen6, gen7, gen8, gen9]
const genColors = ['primary', 'success', 'error']

const GenerationPicker = () => {
  const gameInitialized = useAppSelector(selectGameState).initialized
  const currentGeneration = useAppSelector(selectGameQueue).generations
  const dispatch = useAppDispatch()

  const handleGenerations = (
    event: React.MouseEvent<HTMLElement>,
    newGens: string[]
  ) => {
    if (newGens.length > 0) {
      dispatch(queueGenerations(newGens))
    }
  }
  return (
    <>
      <Stack direction="row" alignItems="baseline">
        <Typography variant="h6" marginBottom={1} marginRight={1}>
          Generations
        </Typography>
      </Stack>

      <ToggleButtonGroup
        orientation="vertical"
        value={currentGeneration}
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
            onKeyDown={(e) => e.preventDefault()}
            disabled={gameInitialized}
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
              <img
                src={genIcons[Number(gen) - 1]}
                height={48}
                style={{
                  filter:
                    gameInitialized && !currentGeneration.includes(gen)
                      ? 'grayscale(100%)'
                      : '',
                }}
              />
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  )
}

export default GenerationPicker
