import { Direction, PlacedWord, Solution, SolutionMap, Word } from '../types'
import {
  createNewSolutions,
  createStartingSolution,
  findSolution,
  getSolutionsForBranch
} from './solutions'
import { buildTree, createNode } from './tree'
import { buildPlacedWords } from './testUtils'

describe('createNewSolutions', () => {
  let words: Word[]
  let placedWords: PlacedWord[]
  let solutionMap: SolutionMap = new Map()
  let solution: Solution

  beforeEach(() => {
    words = [
      {
        display: 'abc',
        clue: ''
      },
      { display: 'ade', clue: '' },
      { display: 'exe', clue: '' }
    ]

    placedWords = buildPlacedWords(words, solutionMap)

    solution = {
      words: placedWords,
      map: solutionMap
    }
  })
  it('should add a word that fits vertically twice', () => {
    const result = createNewSolutions(words[2].display, 2, solution)
    expect(result.length).toBe(2)
    expect(result[0].words.length).toBe(3)
    expect(result[1].words.length).toBe(3)
    expect(result[1].words[2].wordIndex).toBe(2)
    expect(result[1].map.size).toBe(7)
  })

  it('should not add a word if no match', () => {
    const result = createNewSolutions('xxx', 100, solution)
    expect(result.length).toBe(0)
  })
})

describe('findSolution', () => {
  it('should find the best solution for a given set of words', () => {
    const words = [
      { display: 'axxxa', clue: '' },
      { display: 'aggggy', clue: '' },
      { display: 'ybbbbbby', clue: '' },
      { display: 'bbbbbbbbbc', clue: '' }
    ]
    const solution = findSolution(words)
    expect(solution.words.length).toBe(4)
    expect(solution.map.size).toBe(26)
  })
})

describe('getSolutionsForBranch', () => {
  it('should get a single solution for a branch', () => {
    const words = [
      {
        display: 'abc',
        clue: ''
      },
      { display: 'adeee', clue: '' }
    ]

    const solution = createStartingSolution(words[0], 0)
    const startingNode = createNode(solution)
    const tree = buildTree(startingNode, words, 1, 3)

    const solutions = getSolutionsForBranch(tree.children[0])
    expect(solutions.length).toBe(1)
  })

  it('should get two solutions for a branch', () => {
    const words = [
      {
        display: 'abca',
        clue: ''
      },
      { display: 'adeee', clue: '' },
      { display: 'exexxxxxx', clue: '' }
    ]

    const solution = createStartingSolution(words[0], 0)
    const startingNode = createNode(solution)
    const tree = buildTree(startingNode, words, 1, 3)

    const solutions = getSolutionsForBranch(tree.children[0])
    expect(solutions.length).toBe(6)
  })
})
