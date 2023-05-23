import { Direction, SolutionMap, Word } from '../types'
import { addWordToMap } from './map'

export const buildPlacedWords = (words: Word[], solutionMap: SolutionMap) => {
  const placedWords = [
    {
      x: 0,
      y: 0,
      wordIndex: 0,
      length: words[0].display.length,
      direction: Direction.Vertical
    },
    {
      x: 0,
      y: 0,
      wordIndex: 1,
      length: words[1].display.length,
      direction: Direction.Horizontal
    }
  ]

  for (const placedWord of placedWords) {
    addWordToMap(
      words[placedWord.wordIndex].display,
      { x: placedWord.x, y: placedWord.y },
      placedWord.direction,
      solutionMap
    )
  }

  return placedWords
}
