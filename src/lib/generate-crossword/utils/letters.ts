import type { Coord, SolutionMap } from '../types'
import { Direction } from '../types'

export const canLetterBePlaced = (
  letter: string,
  letterIndex: number,
  coord: Coord,
  direction: Direction,
  solutionMap: SolutionMap
) => {
  const currentLetter = getLetter(coord, solutionMap)
  if (currentLetter && currentLetter !== letter) {
    return false
  }

  if (currentLetter) {
    if (
      direction === Direction.Horizontal &&
      (getLetterLeft(coord, solutionMap) || getLetterRight(coord, solutionMap))
    ) {
      return false
    }

    if (
      direction === Direction.Vertical &&
      (getLetterAbove(coord, solutionMap) || getLetterBelow(coord, solutionMap))
    ) {
      return false
    }
  }

  if (!currentLetter) {
    if (letterIndex === 0) {
      if (
        direction === Direction.Horizontal &&
        getLetterLeft(coord, solutionMap)
      ) {
        return false
      }

      if (
        direction === Direction.Vertical &&
        getLetterAbove(coord, solutionMap)
      ) {
        return false
      }
    }
    if (
      direction === Direction.Horizontal &&
      (getLetterAbove(coord, solutionMap) || getLetterBelow(coord, solutionMap))
    ) {
      return false
    }

    if (
      direction === Direction.Vertical &&
      (getLetterLeft(coord, solutionMap) || getLetterRight(coord, solutionMap))
    ) {
      return false
    }
  }

  return true
}

type GetLetterFn = (
  coord: Coord,
  solutionMap: SolutionMap
) => string | undefined

export const getLetter: GetLetterFn = (coord, solutionMap) =>
  solutionMap.get(`${coord.x},${coord.y}`)

const getLetterAbove: GetLetterFn = (coord, solutionMap) =>
  getLetter({ x: coord.x, y: coord.y + 1 }, solutionMap)

const getLetterBelow: GetLetterFn = (coord, solutionMap) =>
  getLetter({ x: coord.x, y: coord.y - 1 }, solutionMap)

const getLetterLeft: GetLetterFn = (coord, solutionMap) =>
  getLetter({ x: coord.x - 1, y: coord.y }, solutionMap)

const getLetterRight: GetLetterFn = (coord, solutionMap) =>
  getLetter({ x: coord.x + 1, y: coord.y }, solutionMap)
