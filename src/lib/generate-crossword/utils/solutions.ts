import type { Word, Words, Solution, Solutions, Node } from '../types'
import { Direction } from '../types'
import {
  addWordToMap,
  buildTree,
  convertSolutionMapToLetterMap,
  canWordBePlaced,
  createNode,
  generateScore,
  findBestBranch
} from './'

export const createNewSolutions = (
  wordDisplay: Word['display'],
  wordIndex: number,
  solution: Solution
): Solutions => {
  const newSolutions: Solutions = []
  const letterMap = convertSolutionMapToLetterMap(solution.map)
  for (const [i, letter] of [...wordDisplay].entries()) {
    const matches = letterMap.get(letter)
    if (!matches) {
      continue
    }
    for (const match of matches) {
      const [x, y] = match.split(',') // TODO: use a coord object as the map key?
      const targetCoord = { x: parseInt(x), y: parseInt(y) }
      const attempts = [
        {
          coord: {
            x: targetCoord.x - i,
            y: targetCoord.y
          },
          direction: Direction.Horizontal
        },
        {
          coord: {
            x: targetCoord.x,
            y: targetCoord.y + i
          },
          direction: Direction.Vertical
        }
      ]

      attempts.forEach((attempt) => {
        const { coord, direction } = attempt
        if (canWordBePlaced(wordDisplay, coord, direction, solution.map)) {
          const solutionMap = new Map(solution.map)
          newSolutions.push({
            words: [
              ...solution.words,
              {
                ...coord,
                wordIndex,
                length: wordDisplay.length,
                direction
              }
            ],
            map: addWordToMap(wordDisplay, coord, direction, solutionMap)
          })
        }
      })
    }
  }
  return newSolutions
}

export const createStartingSolution = (
  word: Word,
  wordIndex: number
): Solution => ({
  words: [
    {
      x: 0,
      y: 0,
      wordIndex,
      length: word.display.length,
      direction: Direction.Horizontal
    }
  ],
  map: addWordToMap(
    word.display,
    { x: 0, y: 0 },
    Direction.Horizontal,
    new Map()
  )
})

export const findSolution = (words: Words): Solution => {
  let solution = createStartingSolution(words[0], 0)
  const unusedWords = []
  for (let i = 1; i < words.length; i++) {
    if (unusedWords.length) {
      solution = applyUnusedWordsToSolution(unusedWords, words, i, solution)
    }
    const word = words[i]
    const newSolutions = createNewSolutions(word.display, i, solution)
    if (!newSolutions.length) {
      unusedWords.push({
        word,
        index: i
      })
    }
    if (newSolutions.length === 1) {
      solution = newSolutions[0]
    }
    if (newSolutions.length > 1) {
      solution = findBestChoiceOfSolutions(solution, newSolutions, words, i)
    }
  }
  if (unusedWords.length) {
    solution = applyUnusedWordsToSolution(
      unusedWords,
      words,
      words.length,
      solution
    )
  }
  return { ...solution, unusedWords: unusedWords.map((word) => word.word) }
}

const applyUnusedWordsToSolution = (
  unusedWords: { word: Word; index: number }[],
  words: Words,
  currentWordIndex: number,
  solution: Solution
) => {
  for (let i = 0; i < unusedWords.length; i++) {
    const { word, index } = unusedWords[i]
    const newSolutions = createNewSolutions(word.display, index, solution)
    if (newSolutions.length) {
      unusedWords.splice(i, 1)
    }
    if (newSolutions.length === 1) {
      solution = newSolutions[0]
    }
    if (newSolutions.length > 1) {
      solution = findBestChoiceOfSolutions(
        solution,
        newSolutions,
        words,
        currentWordIndex
      )
    }
  }
  return solution
}

export const findBestChoiceOfSolutions = (
  solution: Solution,
  newSolutions: Solutions,
  words: Words,
  wordIndex: number
) => {
  const startingNode = createNode(
    solution,
    newSolutions.map((solution) => createNode(solution))
  )
  // Basic for now but adjust depth based on number of words
  const depth = words.length > 40 ? 4 : 10
  const tree = buildTree(startingNode, words, wordIndex, depth)
  return findBestBranch(tree)
}

export const getSolutionsForBranch = (
  node: Node,
  solutions: Solutions = []
) => {
  if (node.children.length === 0) {
    solutions.push(node.solution)
  } else {
    for (const childNode of node.children) {
      getSolutionsForBranch(childNode, solutions)
    }
  }

  return solutions
}
