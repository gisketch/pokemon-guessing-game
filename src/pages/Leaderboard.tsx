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
      Working on a bug. Leaderboard will be up soon. Thank you for your
      patience!
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
