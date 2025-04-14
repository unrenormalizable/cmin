import { assertEquals } from '@std/assert'
import * as main from './main.js'

Deno.test({
  name: 'empty file',
  fn() {
    const text = ''
    const tokens = main.scanAll(text)

    // This will never be reached
    assertEquals([
      {
        id: main.TOK_EOF,
        value: null,
        location: { pos: 0, line: 1, column: 1 },
      },
    ], tokens)
  },
})

Deno.test({
  name: 'random error token',
  fn() {
    const text = '   \r#  \r\n  \n  '
    const tokens = main.scanAll(text)

    // This will never be reached
    assertEquals(
      [
        { id: main.TOK_WHITESPACE, value: null, location: { pos: 0, line: 1, column: 1 } },
        { id: main.TOK_ERROR, value: null, location: { pos: 4, line: 2, column: 1 } },
      ],
      tokens,
    )
  },
})

Deno.test({
  name: 'empty file with whitespace',
  fn() {
    const text = '   \r\t  \r\n  \n  '
    const tokens = main.scanAll(text)

    // This will never be reached
    assertEquals(
      [
        { id: main.TOK_WHITESPACE, value: null, location: { pos: 0, line: 1, column: 1 } },
        { id: main.TOK_EOF, value: null, location: { pos: 14, line: 4, column: 3 } },
      ],
      tokens,
    )
  },
})

Deno.test({
  name: 'trivial main function',
  fn() {
    const text = 'fn main() {\n}'
    const tokens = main.scanAll(text)

    // This will never be reached
    assertEquals(
      [
        { id: main.TOK_KEYWORD, value: 'fn', location: { pos: 0, line: 1, column: 1 } },
        { id: main.TOK_WHITESPACE, value: null, location: { pos: 2, line: 1, column: 3 } },
        { id: main.TOK_IDENTIFIER, value: 'main', location: { pos: 3, line: 1, column: 4 } },
        { id: main.TOK_SYMBOL, value: '(', location: { pos: 7, line: 1, column: 8 } },
        { id: main.TOK_SYMBOL, value: ')', location: { pos: 8, line: 1, column: 9 } },
        { id: main.TOK_WHITESPACE, value: null, location: { pos: 9, line: 1, column: 10 } },
        { id: main.TOK_SYMBOL, value: '{', location: { pos: 10, line: 1, column: 11 } },
        { id: main.TOK_WHITESPACE, value: null, location: { pos: 11, line: 1, column: 12 } },
        { id: main.TOK_SYMBOL, value: '}', location: { pos: 12, line: 2, column: 1 } },
        { id: main.TOK_EOF, value: null, location: { pos: 13, line: 2, column: 2 } },
      ],
      tokens,
    )
  },
})
