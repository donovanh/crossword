import { Direction, PlacedWord, Solution, SolutionMap, Word } from '../types'
import { addWordToMap, generateScore } from './'

describe('generateScore', () => {
  let words: Word[]
  let placedWords: PlacedWord[]
  let solutionMap: SolutionMap = new Map()
  let solution: Solution

  const buildPlacedWords = (words: Word[], solutionMap: SolutionMap) => {
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
      },
      {
        x: -2,
        y: -2,
        wordIndex: 2,
        length: words[2].display.length,
        direction: Direction.Vertical
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

  it('should generate a score for a grid', () => {
    words = [
      {
        display: 'abc',
        clue: ''
      },
      { display: 'ade', clue: '' },
      { display: 'exxxx', clue: '' }
    ]

    placedWords = buildPlacedWords(words, solutionMap)

    solution = {
      words: placedWords,
      map: solutionMap
    }
    const result = generateScore(solution)
    expect(result).toBeCloseTo(3.428)
  })

  it('should generate a better for a squarer grid', () => {
    words = [
      {
        display: 'abc',
        clue: ''
      },
      { display: 'ade', clue: '' },
      { display: 'exx', clue: '' }
    ]

    placedWords = buildPlacedWords(words, solutionMap)

    solution = {
      words: placedWords,
      map: solutionMap
    }
    const result = generateScore(solution)
    expect(result).toBe(3.6)
  })

  it('should generate a worse for a much less square grid', () => {
    words = [
      {
        display: 'abc',
        clue: ''
      },
      { display: 'ade', clue: '' },
      { display: 'exxxxxxxxxxxxxxxxxxxxxxxxxxxxx', clue: '' }
    ]

    placedWords = buildPlacedWords(words, solutionMap)

    solution = {
      words: placedWords,
      map: solutionMap
    }
    const result = generateScore(solution)
    expect(result).toBeCloseTo(3.093)
  })
})
