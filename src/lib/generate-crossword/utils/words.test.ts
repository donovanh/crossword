import { Direction, PlacedWord, SolutionMap, Word } from '../types'
import { canWordBePlaced, sortWords } from './words'
import { buildPlacedWords } from './testUtils'

describe('canWordBePlaced', () => {
  let words: Word[]
  let placedWords: PlacedWord[]
  let solutionMap: SolutionMap = new Map()

  beforeEach(() => {
    words = [
      {
        display: 'abc',
        clue: ''
      },
      { display: 'ade', clue: '' }
    ]

    placedWords = buildPlacedWords(words, solutionMap)
  })

  // TODO: More tests
  it('returns true when a word can be placed horizontally', () => {
    const matchCStart = canWordBePlaced(
      'cxx',
      { x: 0, y: -2 },
      Direction.Horizontal,
      solutionMap
    )
    expect(matchCStart).toBe(true)

    const matchCEnd = canWordBePlaced(
      'xxc',
      { x: -2, y: -2 },
      Direction.Horizontal,
      solutionMap
    )
    expect(matchCEnd).toBe(true)
  })

  it('returns true when a word can be placed vertically', () => {
    const matchEStart = canWordBePlaced(
      'exx',
      { x: 2, y: 0 },
      Direction.Vertical,
      solutionMap
    )
    expect(matchEStart).toBe(true)

    const matchEEnd = canWordBePlaced(
      'xxe',
      { x: 2, y: 2 },
      Direction.Vertical,
      solutionMap
    )
    expect(matchEEnd).toBe(true)
  })

  it('returns false when a word would be placed beside another', () => {
    const matchEStart = canWordBePlaced(
      'bcd',
      { x: 0, y: -1 },
      Direction.Horizontal,
      solutionMap
    )
    expect(matchEStart).toBe(false)
  })

  it('returns false when a word would butt up against another', () => {
    const matchEStart = canWordBePlaced(
      'aaa',
      { x: -3, y: -1 },
      Direction.Horizontal,
      solutionMap
    )
    expect(matchEStart).toBe(false)
  })
})

describe('sortWords', () => {
  it('should sort a list of words descending', () => {
    const words = [
      {
        display: 'aaa',
        clue: ''
      },
      {
        display: 'aaaa',
        clue: ''
      },
      {
        display: 'aa',
        clue: ''
      },
      {
        display: 'aaa',
        clue: ''
      },
      {
        display: 'a',
        clue: ''
      },
      {
        display: 'aaaaa',
        clue: ''
      }
    ]
    const result = sortWords(words)
    expect(result[0].display).toEqual('aaaaa')
    expect(result[1].display).toEqual('aaaa')
    expect(result[2].display).toEqual('aaa')
    expect(result[3].display).toEqual('aaa')
    expect(result[4].display).toEqual('aa')
    expect(result[5].display).toEqual('a')
  })
})
