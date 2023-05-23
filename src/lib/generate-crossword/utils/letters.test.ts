import { Direction } from '../types'
import { addWordToMap, canLetterBePlaced, getLetter } from './'

const words = [
  {
    display: 'zabcde'
  },
  { display: 'abcd' },
  { display: 'abcd' }
]

const placedWords = [
  {
    x: 0,
    y: 1,
    wordIndex: 0,
    direction: Direction.Vertical
  },
  {
    x: 0,
    y: 0,
    wordIndex: 1,
    direction: Direction.Horizontal
  },
  {
    x: -3,
    y: -3,
    wordIndex: 2,
    direction: Direction.Horizontal
  }
]

describe('canLetterBePlaced', () => {
  let solutionMap = new Map<string, string>()

  beforeAll(() => {
    for (const placedWord of placedWords) {
      addWordToMap(
        words[placedWord.wordIndex].display,
        { x: placedWord.x, y: placedWord.y },
        placedWord.direction,
        solutionMap
      )
    }
  })

  describe('when cell is not empty', () => {
    it('returns false if letter does not match', () => {
      const coord = { x: 0, y: 0 }

      expect(
        canLetterBePlaced('x', 1, coord, Direction.Horizontal, solutionMap)
      ).toBe(false)
    })
    describe('when direction is horizontal', () => {
      it('returns false if letter on left', () => {
        const coord = { x: 3, y: 0 }

        expect(
          canLetterBePlaced('d', 1, coord, Direction.Horizontal, solutionMap)
        ).toBe(false)
      })

      it('returns false if letter on right', () => {
        const coord = { x: -3, y: -3 }

        expect(
          canLetterBePlaced('a', 1, coord, Direction.Horizontal, solutionMap)
        ).toBe(false)
      })
    })

    describe('when direction is vertical', () => {
      it('returns false if letter above', () => {
        const coord = { x: 0, y: -4 }

        expect(
          canLetterBePlaced('e', 1, coord, Direction.Vertical, solutionMap)
        ).toBe(false)
      })

      it('returns false if letter below', () => {
        const coord = { x: 0, y: 1 }

        expect(
          canLetterBePlaced('z', 1, coord, Direction.Vertical, solutionMap)
        ).toBe(false)
      })
    })
  })

  describe('when cell is empty', () => {
    describe('when direction is horizontal', () => {
      it('returns false if letter above', () => {
        const coord = { x: 2, y: -1 }

        expect(
          canLetterBePlaced('a', 1, coord, Direction.Horizontal, solutionMap)
        ).toBe(false)
      })

      it('returns false if letter below', () => {
        const coord = { x: 2, y: 1 }

        expect(
          canLetterBePlaced('a', 1, coord, Direction.Horizontal, solutionMap)
        ).toBe(false)
      })
    })

    describe('when direction is vertical', () => {
      it('returns false if letter on left', () => {
        const coord = { x: 4, y: 0 }

        expect(
          canLetterBePlaced('a', 1, coord, Direction.Vertical, solutionMap)
        ).toBe(false)
      })

      it('returns false if letter on right', () => {
        const coord = { x: -1, y: 0 }

        expect(
          canLetterBePlaced('a', 1, coord, Direction.Vertical, solutionMap)
        ).toBe(false)
      })
    })
  })
})

describe('getLetter', () => {
  let solutionMap = new Map<string, string>()

  beforeAll(() => {
    for (const placedWord of placedWords) {
      addWordToMap(
        words[placedWord.wordIndex].display,
        { x: placedWord.x, y: placedWord.y },
        placedWord.direction,
        solutionMap
      )
    }
  })

  it('should return null when no letter at coord', () => {
    const coord = { x: 10, y: 10 }
    expect(getLetter(coord, solutionMap)).toBe(undefined)
  })

  it('should return current letter at coord x: 0, y: -1', () => {
    const coord = { x: 0, y: -1 }
    expect(getLetter(coord, solutionMap)).toBe('b')
  })

  it('should return current letter at coord x: 0, y: -3', () => {
    const coord = { x: 0, y: -3 }
    expect(getLetter(coord, solutionMap)).toBe('d')
  })

  it('should return current letter at coord x: 1, y: 0', () => {
    const coord = { x: 1, y: 0 }
    expect(getLetter(coord, solutionMap)).toBe('b')
  })
})
