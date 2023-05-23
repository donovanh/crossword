import type { PlacedWord, Solution, SolutionMap, Word } from '../types'
import { Direction } from '../types'
import { addWordToMap } from './map'
import { convertSolutionToGrid, getGridValues } from './grid'

describe('grid', () => {
  let words: Word[]
  let placedWords: PlacedWord[]
  let solutionMap: SolutionMap = new Map()
  let solution: Solution

  beforeEach(() => {
    words = [
      {
        display: 'xax',
        clue: ''
      },
      { display: 'yayya', clue: '' },
      { display: 'zzzza', clue: '' }
    ]

    placedWords = [
      {
        x: 0,
        y: 0,
        wordIndex: 0,
        length: words[0].display.length,
        direction: Direction.Horizontal
      },
      {
        x: 1,
        y: 1,
        wordIndex: 1,
        length: words[1].display.length,
        direction: Direction.Vertical
      },
      {
        x: -3,
        y: -3,
        wordIndex: 2,
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

    solution = {
      words: placedWords,
      map: solutionMap
    }
  })

  describe('convertSolutionToGrid', () => {
    it('converts a solution to a grid solution', () => {
      const gridSolution = convertSolutionToGrid(words, solution)
      // Words
      expect(gridSolution.words.length).toEqual(3)
      expect(gridSolution.words[0].x).toEqual(3) // Was 0,0
      expect(gridSolution.words[0].y).toEqual(1)
      expect(gridSolution.words[1].x).toEqual(4)
      expect(gridSolution.words[1].y).toEqual(0)
      expect(gridSolution.words[2].x).toEqual(0)
      expect(gridSolution.words[2].y).toEqual(4)

      // Grid map
      expect(Object.fromEntries(gridSolution.map.entries())).toEqual({
        '0,4': 'z',
        '1,4': 'z',
        '2,4': 'z',
        '3,1': 'x',
        '3,4': 'z',
        '4,0': 'y',
        '4,1': 'a',
        '4,2': 'y',
        '4,3': 'y',
        '4,4': 'a',
        '5,1': 'x'
      })
    })
  })

  describe('getGridValues', () => {
    it('gets grid values for solution', () => {
      const { gridBottom, gridLeft, gridRight, gridTop } =
        getGridValues(solution)

      expect(gridBottom).toBe(-4)
      expect(gridLeft).toBe(-3)
      expect(gridRight).toBe(3)
      expect(gridTop).toBe(1)
    })
  })
})
