import { generateCrossword } from './generateCrossword'

describe('generateCrossword', () => {
  it('should generate a crossword', async () => {
    const words = [
      { display: 'apple', clue: '' },
      { display: 'banana', clue: '' },
      { display: 'pear', clue: '' },
      { display: 'pineapple', clue: '' },
      { display: 'grape', clue: '' },
      { display: 'kiwi', clue: '' },
      { display: 'feijoa', clue: '' }
    ]
    const crossword = await generateCrossword(words)
    expect(crossword.words.length).toBeGreaterThan(5)
    expect(crossword.map.size).toBeGreaterThan(28)
  })

  it('generates solutions for simple crossword', async () => {
    const words = [
      {
        display: 'abc',
        clue: ''
      },
      {
        display: 'cde',
        clue: ''
      },
      {
        display: 'def',
        clue: ''
      }
    ]
    const crossword = await generateCrossword(words)
    expect(crossword.words.length).toBe(3)
  })

  it('retries when a word fails first time', async () => {
    const words = [
      {
        display: 'abc',
        clue: ''
      },
      {
        display: 'yef', // Won't fit until later word placed
        clue: ''
      },
      {
        display: 'xxx', // Won't fit
        clue: ''
      },
      {
        display: 'cde',
        clue: ''
      },
      {
        display: 'hhh',
        clue: ''
      },
      {
        display: 'fgh',
        clue: ''
      }
    ]
    const crossword = await generateCrossword(words, { keepWordOrder: true })
    expect(crossword.words.length).toBe(5)
  })

  it('returns unused words', async () => {
    const words = [
      {
        display: 'abc',
        clue: ''
      },
      {
        display: 'xxx', // Won't fit
        clue: ''
      },
      {
        display: 'fgh',
        clue: ''
      }
    ]
    const crossword = await generateCrossword(words)
    expect(crossword.unusedWords).toEqual([
      { display: 'xxx', clue: '' },
      { display: 'fgh', clue: '' }
    ])
  })

  it('times the execution time', async () => {
    const words = [
      {
        display: 'abc',
        clue: ''
      },
      {
        display: 'cde',
        clue: ''
      }
    ]
    const crossword = await generateCrossword(words)
    expect(crossword.time).toBeGreaterThan(0)
  })

  it('can handle lots of words', async () => {
    const words = []
    for (let i = 0; i < 50; i++) {
      words.push({
        display: 'aaaaaaa',
        clue: ''
      })
    }

    const crossword = await generateCrossword(words)
    expect(crossword.words.length).toBe(50)
  })
})
