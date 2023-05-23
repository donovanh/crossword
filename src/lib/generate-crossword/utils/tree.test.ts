import {
  createStartingSolution,
  createNode,
  buildTree,
  findBestBranch
} from './'

describe('findBestBranch', () => {
  it('should find the best option for a branch', () => {
    const words = [
      {
        display: 'abca',
        clue: ''
      },
      { display: 'adeee', clue: '' },
      { display: 'xxxxxxe', clue: '' }
    ]

    const solution = createStartingSolution(words[0], 0)
    const startingNode = createNode(solution)
    const tree = buildTree(startingNode, words, 1, 3)

    const result = findBestBranch(tree)
    // Placing on 3,0 is better than the match on 0,0
    expect(result.words[1].x).toEqual(3)
    expect(result.words[1].y).toEqual(0)
  })
})

describe('buildTree', () => {
  it('should build a tree', () => {
    const words = [
      {
        display: 'abc',
        clue: ''
      },
      { display: 'ade', clue: '' },
      { display: 'exe', clue: '' }
    ]

    const solution = createStartingSolution(words[0], 0)
    const startingNode = createNode(solution)
    const tree = buildTree(startingNode, words, 1, 3)

    // First level
    expect(tree.children.length).toBe(1)
    expect(tree.children[0].solution.words.length).toBe(2)

    // Second level
    expect(tree.children[0].children.length).toBe(2) // 2 possibilities
    expect(tree.children[0].children[0].solution.words.length).toBe(3)
    expect(tree.children[0].children[1].solution.words.length).toBe(3)
  })
  it('should stop at the target depth', () => {
    const words = [
      {
        display: 'abc',
        clue: ''
      },
      { display: 'ade', clue: '' },
      { display: 'exe', clue: '' },
      { display: 'eyyyyy', clue: '' } // Should stop before level 4
    ]

    const solution = createStartingSolution(words[0], 0)
    const startingNode = createNode(solution)
    const tree = buildTree(startingNode, words, 1, 3)
    expect(tree.children[0].children[0].children.length).toBe(0)
    expect(tree.children[0].children[0].children[0]?.solution).toBe(undefined)
  })

  it('can handle lots of words and matches', () => {
    const words = []
    for (let i = 0; i < 20; i++) {
      words.push({
        display: 'abcdefgh',
        clue: ''
      })
    }

    const solution = createStartingSolution(words[0], 0)
    const startingNode = createNode(solution)
    const tree = buildTree(startingNode, words, 1, 4)
    expect(tree).not.toBeUndefined()
  })
})
