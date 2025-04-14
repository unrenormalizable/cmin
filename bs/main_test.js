import { assertEquals } from '@std/assert'
import * as main from './main.js'

Deno.test({
  name: 'scan: empty file',
  fn() {
    const text = ''
    const tokens = main.scanAll(text)

    assertEquals(tokens, [
      {
        id: main.TOK_EOF,
        value: null,
        location: { pos: 0, line: 1, column: 1 },
      },
    ])
  },
})

Deno.test({
  name: 'scan: random error token',
  fn() {
    const text = '   \r#  \r\n  \n  '
    const tokens = main.scanAll(text)

    assertEquals(
      tokens,
      [
        { id: main.TOK_ERROR, value: null, location: { pos: 4, line: 2, column: 1 } },
      ],
    )
  },
})

Deno.test({
  name: 'scan: empty file with whitespace',
  fn() {
    const text = '   \r\t  \r\n  \n  '
    const tokens = main.scanAll(text)

    assertEquals(
      tokens,
      [
        { id: main.TOK_EOF, value: null, location: { pos: 14, line: 4, column: 3 } },
      ],
    )
  },
})

Deno.test({
  name: 'scan: trivial main function',
  fn() {
    const text = 'fn main() {\n}'
    const tokens = main.scanAll(text)

    assertEquals(
      tokens,
      [
        { id: main.TOK_KEYWORD, value: 'fn', location: { pos: 0, line: 1, column: 1 } },
        { id: main.TOK_IDENTIFIER, value: 'main', location: { pos: 3, line: 1, column: 4 } },
        { id: main.TOK_SYMBOL, value: '(', location: { pos: 7, line: 1, column: 8 } },
        { id: main.TOK_SYMBOL, value: ')', location: { pos: 8, line: 1, column: 9 } },
        { id: main.TOK_SYMBOL, value: '{', location: { pos: 10, line: 1, column: 11 } },
        { id: main.TOK_SYMBOL, value: '}', location: { pos: 12, line: 2, column: 1 } },
        { id: main.TOK_EOF, value: null, location: { pos: 13, line: 2, column: 2 } },
      ],
    )
  },
})

Deno.test({
  name: 'parse: empty file',
  fn() {
    const text = ''
    const ret = main.parse(text)

    assertEquals(
      ret,
      {
        ast: {
          id: main.AST_NODE_PROGRAM,
          functions: [],
        },
        state: { pos: 1 },
        errors: [],
      },
    )
  },
})

Deno.test({
  name: 'parse: empty file with whitespace',
  fn() {
    const text = '   \r\t  \r\n  \n  '
    const ret = main.parse(text)

    assertEquals(
      ret,
      {
        ast: {
          id: main.AST_NODE_PROGRAM,
          functions: [],
        },
        state: { pos: 1 },
        errors: [],
      },
    )
  },
})

Deno.test({
  name: 'parse: random scanner error',
  fn() {
    const text = '   \r#  \r\n  \n  '
    const ret = main.parse(text)

    assertEquals(
      ret,
      {
        ast: {
          id: main.AST_NODE_PROGRAM,
          functions: [],
        },
        state: { pos: 2 },
        errors: [{
          location: {
            column: 1,
            line: 2,
            pos: 4,
          },
          message: 'scanner error token',
        }],
      },
    )
  },
})

Deno.test({
  name: 'parse: trivial main function',
  fn() {
    const text = 'fn main() {\n}'
    const ret = main.parse(text)

    assertEquals(
      ret,
      {
        ast: {
          id: main.AST_NODE_PROGRAM,
          functions: [{
            id: main.AST_NODE_FUNCTION,
            name: 'main',
            statements: [],
          }],
        },
        state: { pos: 10 },
        errors: [],
      },
    )
  },
})
