import type { Coord, Word, SolutionMap } from '../types'
import { Direction } from '../types'

export const addWordToMap = (
  wordDisplay: Word['display'],
  coord: Coord,
  direction: Direction,
  map: Map<string, string>,
  gridMode?: boolean
): SolutionMap => {
  for (let i = 0; i < wordDisplay.length; i++) {
    const yCoordString = gridMode
      ? `${coord.x},${coord.y + i}`
      : `${coord.x},${coord.y + -i}`
    const key =
      direction === Direction.Horizontal
        ? `${coord.x + i},${coord.y}`
        : yCoordString

    map.set(key, wordDisplay[i])
  }
  return map
}

export const convertSolutionMapToLetterMap = (map: SolutionMap) =>
  [...map].reduce((acc, [coord, letter]) => {
    const prevValue = acc.get(letter) ? acc.get(letter) : []
    acc.set(letter, [...prevValue, coord])
    return acc
  }, new Map())
