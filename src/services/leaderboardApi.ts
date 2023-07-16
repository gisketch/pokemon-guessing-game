import { db } from '../firebase'
import { uid } from 'uid'
import {
  collection,
  addDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore'
import { PlayerData } from '../utils/types'

export const writeToLeaderboard = async (playerData: PlayerData) => {
  const uuid = uid()
  await addDoc(collection(db, 'leaderboard'), {
    playerData,
    uuid,
  })
}

export const readLeaderboard = async (
  lastDoc: QueryDocumentSnapshot<DocumentData, DocumentData> | null
) => {
  let leaderboardQuery

  if (lastDoc) {
    leaderboardQuery = query(
      collection(db, 'leaderboard'),
      orderBy('playerData.score', 'desc'),
      startAfter(lastDoc),
      limit(10)
    )
  } else {
    leaderboardQuery = query(
      collection(db, 'leaderboard'),
      orderBy('playerData.score', 'desc'),
      limit(10)
    )
  }

  const querySnapshot = await getDocs(leaderboardQuery)
  const data: any = []
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() })
  })

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
  return { data, lastVisible }
}

// export const readLeaderboard = async () => {
//   const leaderboardQuery = query(
//     collection(db, 'leaderboard'),
//     orderBy('playerData.score', 'desc'),
//     startAfter('playerData.score'),
//     limit(10)
//   )

//   const querySnapshot = await getDocs(leaderboardQuery)
//   const data: any = []
//   querySnapshot.forEach((doc) => {
//     data.push(doc.data())
//   })
//   return data
// }
