import { Solution, Solutions } from '../types'
import { getGridValues } from './grid'

export const getBestScoreForSolutions = (solutions: Solutions) =>
  solutions.reduce((acc, solution) => {
    const score = generateScore(solution)
    return score > acc ? score : acc
  }, 0)

export const generateScore = (solution: Solution) => {
  const numberOfWords = solution.words.length

  const { gridWidth, gridHeight } = getGridValues(solution)
  const squareness = calculateSquareness(gridWidth, gridHeight)
  const density = calculateDensity(solution, gridWidth, gridHeight)

  return numberOfWords + squareness + density * 4
}

function calculateSquareness(width: number, height: number) {
  const aspectRatio = width / height
  const squareness = Math.min(1 / aspectRatio, aspectRatio)
  return squareness
}

function calculateDensity(solution: Solution, width: number, height: number) {
  const letterCount = solution.words.reduce(
    (total, word) => total + word.length,
    0
  )
  const numberOfCells = width * height
  return letterCount / numberOfCells
}
