import { assertSnapshot } from '@std/testing/snapshot'
import * as scanner from './scanner.js'

Deno.test({
  name: 'scan: empty file',
  fn: async (tc) => {
    const text = ''
    const tokens = scanner.scanAll(text)

    await assertSnapshot(tc, tokens, {})
  },
})

Deno.test({
  name: 'scan: random error token',
  fn: async (tc) => {
    const text = '   \r#  \r\n  \n  '
    const tokens = scanner.scanAll(text)

    await assertSnapshot(tc, tokens, {})
  },
})

Deno.test({
  name: 'scan: empty file with whitespace',
  fn: async (tc) => {
    const text = '   \r\t  \r\n  \n  '
    const tokens = scanner.scanAll(text)

    await assertSnapshot(tc, tokens, {})
  },
})

Deno.test({
  name: 'scan: trivial main function',
  fn: async (tc) => {
    const text = 'fn main() {\n}'
    const tokens = scanner.scanAll(text)

    await assertSnapshot(tc, tokens, {})
  },
})

Deno.test({
  name: 'incremental scanner',
  fn: async (tc) => {
    const text = 'fn main() {\n}'

    let ret = { state: { pos: 0, line: 1, column: 1 } }
    const tokens = []
    while (true) {
      ret = scanner.scan(text, ret.state)
      tokens.push(ret.token)
      if (ret.token.id === scanner.TOK_EOF || ret.token.id === scanner.TOK_ERROR) {
        break
      }
    }

    await assertSnapshot(tc, tokens, {})
  },
})
