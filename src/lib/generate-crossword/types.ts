export enum Direction {
  Horizontal,
  Vertical
}

export interface Word {
  display: string
  clue: string
}

export interface PlacedWord {
  x: number
  y: number
  wordIndex: number
  length: number
  direction: Direction
  display?: string
  clue?: string
}

export type Coord = { x: number; y: number }

export type SolutionMap = Map<string, string>

export type Node = {
  solution: Solution
  children: Node[]
}

export interface Solution {
  words: PlacedWord[]
  map: SolutionMap
  score?: number
  time?: number
  unusedWords?: Word[]
}

export type Solutions = Solution[]
export type Words = Word[]

export interface Options {
  width?: number
  height?: number
  keepWordOrder?: boolean
}

export interface CrosswordWord {
  x: number
  y: number
  direction: Direction
  display: string
  clue: string
}

export interface Crossword {
  words: CrosswordWord[]
  unusedWords: Words
  map: SolutionMap
  width: number
  height: number
  score: number
  time: number
}
