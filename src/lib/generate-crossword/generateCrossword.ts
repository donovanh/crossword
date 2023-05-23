import { Crossword, Options, Words } from './types'
import {
  findSolution,
  generateScore,
  sortWords,
  convertSolutionToGrid
} from './utils'

/**
 * generateCrossword
 * @param words { Word[] } An array of Word objects containing display and clue
 * @param options { Options } Options for the generator
 * @returns The best crossword solution derived from the words
 */
export const generateCrossword = async (
  words: Words,
  options: Options = {}
): Promise<Crossword> =>
  new Promise((resolve, reject) => {
    const { width, height, keepWordOrder } = options
    const sortedWords = keepWordOrder ? words : sortWords(words)

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
