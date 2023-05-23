import { addWordToMap, convertSolutionMapToLetterMap } from './map'
import { Direction, SolutionMap } from '../types'

describe('addWordToMap', () => {
  it('should add a word to a map horizontally', () => {
    const map = new Map()
    const coord = {
      x: 0,
      y: 0
    }
    const result = addWordToMap('abc', coord, Direction.Horizontal, map)
    expect(result.size).toBe(3)
    expect(result.get('0,0')).toEqual('a')
    expect(result.get('1,0')).toEqual('b')
    expect(result.get('2,0')).toEqual('c')
  })

  it('should add a word to a map vertically', () => {
    const map = new Map()
    const coord = {
      x: 0,
      y: 0
    }
    const result = addWordToMap('abc', coord, Direction.Vertical, map)
    expect(result.size).toBe(3)
    expect(result.get('0,0')).toEqual('a')
    expect(result.get('0,-1')).toEqual('b')
    expect(result.get('0,-2')).toEqual('c')
  })

  it('should add a second word to a map', () => {
    const map = new Map()
    const coord = {
      x: 0,
      y: 0
    }
    const initialMap = addWordToMap('abc', coord, Direction.Horizontal, map)
    const result = addWordToMap(
      'cde',
      { x: 2, y: 0 },
      Direction.Vertical,
      initialMap
    )
    expect(result.size).toBe(5) // c in in twice at same location
    expect(result.get('2,0')).toEqual('c')
    expect(result.get('2,-1')).toEqual('d')
    expect(result.get('2,-2')).toEqual('e')
  })
})

describe('convertSolutionMapToLetterMap', () => {
  let solutionMap: SolutionMap = new Map()

  beforeEach(() => {
    solutionMap.set('0,0', 'a')
    solutionMap.set('0,-1', 'b')
    solutionMap.set('0,-2', 'c')
    solutionMap.set('0,-3', 'a')
    solutionMap.set('0,-4', 'a')
    solutionMap.set('0,-5', 'b')
  })

  it('converts a solution map to a map containing letters as keys', () => {
    const result = convertSolutionMapToLetterMap(solutionMap)
    expect([...result.entries()]).toEqual([
      ['a', ['0,0', '0,-3', '0,-4']],
      ['b', ['0,-1', '0,-5']],
      ['c', ['0,-2']]
    ])
  })
})
