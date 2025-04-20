import * as assert from '@std/assert'
import { assertSnapshot } from '@std/testing/snapshot'
import * as parser from './parser.js'

Deno.test({
  name: 'parse: empty file',
  fn: async (tc) => {
    const text = ''
    const ret = parser.parse(text)
    assert.assertEquals(ret.result, parser.PARSE_ACCEPTED)
    await assertSnapshot(tc, ret, {})
  },
})

Deno.test({
  name: 'parse: empty file with whitespace',
  fn: async (tc) => {
    const text = '   \r\t  \r\n  \n  '
    const ret = parser.parse(text)
    assert.assertEquals(ret.result, parser.PARSE_ACCEPTED)
    await assertSnapshot(tc, ret, {})
  },
})

Deno.test({
  name: 'parse: random scanner error',
  fn: async (tc) => {
    const text = '   \r#  \r\n  \n  '
    const ret = parser.parse(text)
    assert.assertEquals(ret.result, parser.PARSE_NOT_ACCEPTED)
    await assertSnapshot(tc, ret, {})
  },
})

Deno.test({
  name: 'parse: trivial main function',
  fn: async (tc) => {
    const text = 'fn main() {\n}'
    const ret = parser.parse(text)
    assert.assertEquals(ret.result, parser.PARSE_ACCEPTED)
    await assertSnapshot(tc, ret, {})
  },
})

Deno.test({
  name: 'parse: multiple functions',
  fn: async (tc) => {
    const text = 'fn main() {\n}fn __puts() {}'
    const ret = parser.parse(text)
    assert.assertEquals(ret.result, parser.PARSE_ACCEPTED)
    await assertSnapshot(tc, ret, {})
  },
})
