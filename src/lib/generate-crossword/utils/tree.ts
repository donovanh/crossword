import type { Solution, Words, Node } from '../types'
import {
  createNewSolutions,
  getBestScoreForSolutions,
  getSolutionsForBranch
} from './'

export const createNode = (
  solution: Solution,
  children: Node[] = []
): Node => ({
  solution,
  children
})

export const buildTree = (
  currentNode: Node,
  words: Words,
  depth: number,
  targetDepth: number
) => {
  if (depth < words.length && depth < targetDepth) {
    const newSolutions = createNewSolutions(
      words[depth].display,
      depth,
      currentNode.solution
    )

    if (newSolutions.length) {
      for (const solution of newSolutions) {
        const node = createNode(solution)
        const childNode = buildTree(node, words, depth + 1, targetDepth)
        currentNode.children.push(childNode)
      }
    }
  }

  return currentNode
}

export const findBestBranch = (node: Node) => {
  const possibilities = []
  for (const childNode of node.children) {
    const solutions = getSolutionsForBranch(childNode)
    possibilities.push({
      score: getBestScoreForSolutions(solutions),
      solution: childNode.solution
    })
  }

  return possibilities.sort((a, b) => b.score - a.score)[0].solution
}
