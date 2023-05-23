import type { SolutionMap, Coord, Word, Words } from '../types'
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
  words.sort((a, b) => {
    // Sort by length first
    if (a.display.length !== b.display.length) {
      return a.display.length - b.display.length
    }

    // Sort by number of matching letters
    const matchCountA = countMatchingLetters(a, words)
    const matchCountB = countMatchingLetters(b, words)

    return matchCountB - matchCountA
  })

function countMatchingLetters(word: Word, words: Words) {
  let count = 0

  for (const otherWord of words) {
    if (otherWord !== word) {
      for (const letter of word.display) {
        if (otherWord.display.includes(letter)) {
          count++
        }
      }
    }
  }

  return count
}
