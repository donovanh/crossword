import type { SolutionMap, Coord, Solution, Solutions, Word } from '../types'
import { Direction } from '../types'
import { canLetterBePlaced } from './letters'

export const canWordBePlaced = (
  wordDisplay: Word['display'],
  coord: Coord,
  direction: Direction,
  solutionMap: SolutionMap
) => {
  // Ensure word has a space after it
  const wordLengthToCheck = wordDisplay.length + 1

  for (let i = 0; i < wordLengthToCheck; i++) {
    const letter = wordDisplay[i] || ' '
    const testCoord =
      direction === Direction.Horizontal
        ? { x: coord.x + i, y: coord.y }
        : { x: coord.x, y: coord.y - i }
    if (!canLetterBePlaced(letter, i, testCoord, direction, solutionMap)) {
      return false
    }
  }

  return true
}

export const sortWords = (words: Word[]): Word[] =>
  words.sort((a, b) => b.display.length - a.display.length)
