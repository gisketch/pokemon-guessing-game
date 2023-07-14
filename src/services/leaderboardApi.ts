import { db } from '../firebase'
import { uid } from 'uid'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { PlayerData } from '../utils/types'

export const writeToLeaderboard = async (playerData: PlayerData) => {
  const uuid = uid()
  await addDoc(collection(db, 'leaderboard'), {
    playerData,
    uuid,
  })
}

export const readLeaderboard = async () => {
  const querySnapshot = await getDocs(collection(db, 'leaderboard'))
  const data: any = []
  querySnapshot.forEach((doc) => {
    data.push(doc.data())
  })
  return data
}
