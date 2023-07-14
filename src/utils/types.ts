export interface Pokemon {
  id: string
  name: string
  image: string
  types: string[]
}

export interface PlayerData {
  name: string
  generations: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  score: number
  guesses: number
  maxStreak: number
  fastestGuess?: number
}
