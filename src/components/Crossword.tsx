import { For, Show, createSignal, createEffect, onCleanup } from 'solid-js'
import { generateCrossword } from '~/lib/generate-crossword'
import type { Crossword, Word, Words } from '~/lib/generate-crossword'

interface CrosswordProps {
  words: Words
}

function gridArrayFromCrossword(crossword: Crossword) {
  const { width, height, map } = crossword
  const grid = Array.from({ length: height }, () => Array(width).fill(null))

  map.forEach((value, key) => {
    const [x, y] = key.split(',')
    const coord = { x: parseInt(x), y: parseInt(y) }
    grid[coord.y][coord.x] = value
  })

  return grid
}

function sortWordsByLengthAndMatch(words: Words) {
  words.sort((a, b) => {
    // Sort by length first
    if (a.display.length !== b.display.length) {
      return a.display.length - b.display.length
    }

    // Sort by number of matching letters
    const matchCountA = countMatchingLetters(a, words)
    const matchCountB = countMatchingLetters(b, words)

    return matchCountB - matchCountA
  })

  return words
}

function countMatchingLetters(word: Word, words: Words) {
  let count = 0

  for (const otherWord of words) {
    if (otherWord !== word) {
      for (const letter of word.display) {
        if (otherWord.display.includes(letter)) {
          count++
        }
      }
    }
  }

  return count
}

export default function Crossword({ words }: CrosswordProps) {
  const [crossword, setCrossword] = createSignal<Crossword>()
  const [grid, setGrid] = createSignal<any[][]>()
  const [isGenerating, setIsGenerating] = createSignal(true)

  createEffect(async () => {
    let isMounted = true

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms))

    async function runGenerateCrossword() {
      try {
        await delay(10)
        // Sort words first
        const sortedWords = sortWordsByLengthAndMatch(words)
        const result = await generateCrossword(sortedWords.reverse())

        if (isMounted) {
          setCrossword(result)
          setGrid(gridArrayFromCrossword(result))
          setIsGenerating(false)
        }
      } catch (error) {
        console.error(error)
      }
    }

    runGenerateCrossword()

    onCleanup(() => {
      isMounted = false
    })
  })

  return (
    <>
      {isGenerating() ? (
        <p>Generating...</p>
      ) : (
        <>
          <table class="table-fixed border-collapse">
            <tbody>
              <For each={grid()}>
                {(row) => (
                  <tr>
                    <For each={row}>
                      {(cell) => (
                        <td class="h-5 w-5 border border-current text-center text-xs uppercase">
                          {cell}
                        </td>
                      )}
                    </For>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
          <Show
            when={crossword()!.unusedWords.length}
            fallback={<p>No unused words!</p>}
          >
            <p>Unused words:</p>
            <ul>
              <For each={crossword()!.unusedWords}>
                {(word) => <li>{word.display}</li>}
              </For>
            </ul>
          </Show>
          <p>Stats:</p>
          <ul>
            <li>Time: {Math.round(crossword()!.time || 0)}ms</li>
            <li>Score: {crossword()!.score}</li>
            <li>Height: {crossword()!.height}</li>
            <li>Width: {crossword()!.width}</li>
          </ul>
          <pre>
            <code class="text-xs">{JSON.stringify(crossword, null, 2)}</code>
          </pre>
        </>
      )}
    </>
  )
}
