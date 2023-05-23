import { Crossword, Words } from './types'
import {
  findSolution,
  generateScore,
  sortWords,
  convertSolutionToGrid
} from './utils'

/**
 * generateCrossword
 * @param words { Word[] } An array of Word objects containing display and clue
 * @returns The best crossword solution derived from the words
 */
export const generateCrossword = async (words: Words): Promise<Crossword> =>
  new Promise((resolve, reject) => {
    // Don't impose sorting internally
    const sortedWords = words // sortWords(words)

    const startTime = performance.now()

    const solution = findSolution(sortedWords)
    const gridSolution = convertSolutionToGrid(sortedWords, solution)

    const time = performance.now() - startTime

    resolve({
      ...gridSolution,
      unusedWords: solution.unusedWords!,
      score: generateScore(solution),
      time
    })
  })
