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
  CircularProgress,
  Button,
  ToggleButton,
  ToggleButtonGroup,
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
import { useAppSelector } from '../redux/hooks'
import { selectResponsive } from '../features/responsive/responsiveSlice'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

interface Entry {
  playerData: PlayerData
  uuid: string
}

const Leaderboard = () => {
  const [data, setData] = useState<Entry[]>([])
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<
    DocumentData,
    DocumentData
  > | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [fetchingLeaderboard, setFetchingLeaderboard] = useState(true)

  const [diffFilter, setDiffFilter] = useState<string[]>([
    'easy',
    'medium',
    'hard',
  ])

  const handleDiffFilter = (
    event: React.MouseEvent<HTMLElement>,
    diff: string[]
  ) => {
    if (diff.length === 0) {
      //Do nothing
    } else {
      setDiffFilter(diff)
    }
  }

  const genIcons = [gen1, gen2, gen3, gen4, gen5, gen6, gen7, gen8, gen9]

  const isMobile = useAppSelector(selectResponsive).isMobile

  const fetchData = async () => {
    const result = await readLeaderboard(lastDoc).then((res) => {
      setFetchingLeaderboard(false)
      return res
    })
    setData(result.data)
    setLastDoc(result.lastVisible)
    console.log(result.data)
  }

  const fetchMoreData = async () => {
    setFetchingLeaderboard(true)

    if (lastDoc) {
      const result = await readLeaderboard(lastDoc).then((res) => {
        setFetchingLeaderboard(false)
        return res
      })

      if (result.data.length > 0) {
        setData([...data, ...result.data])
        setLastDoc(result.lastVisible)
      } else {
        setHasMore(false)
      }
    }
  }

  useEffect(() => {
    setFetchingLeaderboard(true)
    fetchData()
  }, [])

  useEffect(() => {
    if (
      data.filter((entry: Entry) =>
        diffFilter.includes(entry.playerData.difficulty)
      ).length < 10
    ) {
      fetchMoreData()
    }
  }, [diffFilter, data])

  const dataToMap: Entry[] = Object.values(data || {}).filter((entry: Entry) =>
    diffFilter.includes(entry.playerData.difficulty)
  )

  return (
    <>
      <ToggleButtonGroup
        orientation="horizontal"
        size="small"
        value={diffFilter}
        onChange={handleDiffFilter}
      >
        <ToggleButton value="easy" color="success">
          Easy
        </ToggleButton>
        <ToggleButton value="medium" color="warning">
          Medium
        </ToggleButton>
        <ToggleButton value="hard" color="error">
          Hard
        </ToggleButton>
      </ToggleButtonGroup>
      <TableContainer component={Box}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Generations</TableCell>
              {!isMobile && (
                <>
                  <TableCell align="right">Max Streak</TableCell>
                  <TableCell align="right">Fastest Guess</TableCell>
                  <TableCell align="right">Guesses</TableCell>
                </>
              )}
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataToMap.map((entry: Entry, index: number) => {
              const playerData = entry.playerData
              let style = {}

              switch (index + 1) {
                case 1: // First Place
                  style = {
                    fontWeight: 600,
                    textShadow: '0 0 5px gold, 0 0 10px gold',
                  }
                  break
                case 2: // Second Place
                  style = {
                    fontWeight: 600,
                    textShadow: '0 0 5px #FFFFFFAA, 0 0 10px #FFFFFF44',
                  }
                  break
                case 3: // Third Place
                  style = {
                    fontWeight: 600,
                    textShadow: '0 0 5px #FFD700AA, 0 0 10px #FFD70044',
                  }
                  break
                default:
                  style = {}
                  break
              }

              return (
                <TableRow key={entry.uuid}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell sx={style}>{playerData.name}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end">
                      {playerData.generations.sort().map((gen) => {
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
                  {!isMobile && (
                    <>
                      <TableCell align="right">
                        {playerData.maxStreak}
                      </TableCell>
                      <TableCell align="right">
                        {playerData.fastestGuess !== undefined
                          ? prettyMilliseconds(playerData.fastestGuess)
                          : ''}
                      </TableCell>
                      <TableCell align="right">{playerData.guesses}</TableCell>
                    </>
                  )}
                  <TableCell align="right">{playerData.score}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        sx={{ marginTop: 2 }}
        disabled={!hasMore || fetchingLeaderboard}
        onClick={fetchMoreData}
      >
        {fetchingLeaderboard ? (
          <>
            Fetching Leaderboard
            <CircularProgress
              size={12}
              color="secondary"
              sx={{ marginLeft: 2 }}
            />
          </>
        ) : hasMore ? (
          'Load More'
        ) : (
          "You've reached the end"
        )}
      </Button>
    </>
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
