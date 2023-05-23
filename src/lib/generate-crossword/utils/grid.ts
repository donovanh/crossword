import type { Solution, Words, SolutionMap, CrosswordWord } from '../types'
import { Direction } from '../types'
import { addWordToMap } from './map'

export const convertSolutionToGrid = (
  words: Words,
  solution: Solution
): {
  words: CrosswordWord[]
  map: SolutionMap
  height: number
  width: number
} => {
  const { gridLeft, gridTop, gridWidth, gridHeight } = getGridValues(solution)
  const xOffset = 0 - gridLeft
  const yOffset = gridTop
  let gridMap = new Map<string, string>()

  const updatedWords = solution.words.map((word) => {
    const updatedCoord = {
      x: word.x + xOffset,
      y: 0 - word.y + yOffset
    }
    gridMap = addWordToMap(
      words[word.wordIndex].display,
      updatedCoord,
      word.direction,
      gridMap,
      true
    )
    return {
      direction: word.direction,
      display: words[word.wordIndex].display,
      clue: words[word.wordIndex].clue,
      ...updatedCoord
    }
  })

  return {
    words: updatedWords,
    map: gridMap,
    height: gridHeight,
    width: gridWidth
  }
}

export const getGridValues = (solution: Solution) => {
  const gridLeft = solution.words.reduce(
    (acc, word) =>
      word.direction === Direction.Horizontal && word.x < acc ? word.x : acc,
    0
  )
  const gridRight = solution.words.reduce(
    (acc, word) =>
      word.direction === Direction.Horizontal && word.x + word.length > acc
        ? word.x + word.length
        : acc,
    0
  )
  const gridTop = solution.words.reduce(
    (acc, word) =>
      word.direction === Direction.Vertical && word.y > acc ? word.y : acc,
    0
  )
  const gridBottom = solution.words.reduce(
    (acc, word) =>
      word.direction === Direction.Vertical && word.y - word.length < acc
        ? word.y - word.length
        : acc,
    0
  )

  const gridWidth = gridRight - gridLeft
  const gridHeight = gridTop - gridBottom

  return {
    gridLeft,
    gridRight,
    gridTop,
    gridBottom,
    gridWidth,
    gridHeight
  }
}
