import { Solution, Solutions } from '../types'
import { getGridValues } from './grid'

export const getBestScoreForSolutions = (solutions: Solutions) =>
  solutions.reduce((acc, solution) => {
    const score = generateScore(solution)
    return score > acc ? score : acc
  }, 0)

export const generateScore = (solution: Solution) => {
  const numberOfWords = solution.words.length

  const { gridBottom, gridLeft, gridRight, gridTop, gridWidth, gridHeight } =
    getGridValues(solution)
  const squareness = calculateSquareness(gridWidth, gridHeight)

  return numberOfWords + squareness
}

function calculateSquareness(width: number, height: number) {
  const aspectRatio = width / height
  const squareness = Math.min(1 / aspectRatio, aspectRatio)
  return squareness
}
