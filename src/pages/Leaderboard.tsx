import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Stack,
  Tooltip,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { readLeaderboard } from '../services/leaderboardApi'
import prettyMilliseconds from 'pretty-ms'
import { PlayerData } from '../utils/types'

import gen1 from '../assets/gen1.png'
import gen2 from '../assets/gen2.png'
import gen3 from '../assets/gen3.png'
import gen4 from '../assets/gen4.png'
import gen5 from '../assets/gen5.png'
import gen6 from '../assets/gen6.png'
import gen7 from '../assets/gen7.png'
import gen8 from '../assets/gen8.png'
import gen9 from '../assets/gen9.png'

interface Entry {
  playerData: PlayerData
  uuid: string
}

const Leaderboard = () => {
  const [data, setData] = useState()
  const genIcons = [gen1, gen2, gen3, gen4, gen5, gen6, gen7, gen8, gen9]

  useEffect(() => {
    const fetchData = async () => {
      const result = await readLeaderboard()
      console.log(result)
      setData(result)
    }
    fetchData()
  }, [])

  const dataToMap: Entry[] = Object.values(data || {})

  return (
    <TableContainer component={Box}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Generations</TableCell>
            <TableCell align="right">Max Streak</TableCell>
            <TableCell align="right">Fastest Guess</TableCell>
            <TableCell align="right">Guesses</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataToMap
            .sort((a: Entry, b) => b.playerData.score - a.playerData.score)
            .map((entry: Entry) => {
              const playerData = entry.playerData
              return (
                <TableRow key={entry.uuid}>
                  <TableCell>{playerData.name}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end">
                      {playerData.generations.map((gen) => {
                        return (
                          <Tooltip title={gen} key={gen}>
                            <div
                              style={{
                                height: 24,
                                width: 24,
                                overflow: 'hidden',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 4,
                              }}
                            >
                              <img
                                style={{
                                  height: '50px',
                                }}
                                src={genIcons[Number(gen) - 1]}
                              />
                            </div>
                          </Tooltip>
                        )
                      })}
                    </Stack>
                  </TableCell>
                  <TableCell align="right">{playerData.maxStreak}</TableCell>
                  <TableCell align="right">
                    {playerData.fastestGuess !== undefined
                      ? prettyMilliseconds(playerData.fastestGuess)
                      : ''}
                  </TableCell>
                  <TableCell align="right">{playerData.guesses}</TableCell>
                  <TableCell align="right">{playerData.score}</TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

// name: string
// generations: string[]
// difficulty: 'easy' | 'medium' | 'hard'
// score: number
// guesses: number
// maxStreak: number
// fastestGuess: number | null

export default Leaderboard
