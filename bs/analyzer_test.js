import { assertSnapshot } from '@std/testing/snapshot'
import * as parser from './parser.js'
import * as analyzer from './analyzer.js'

Deno.test({
  name: 'analyze: override puts function',
  fn: async (tc) => {
    const text = 'fn __puts() {\n}'
    const ret = analyzer.analyze(parser.parse(text))

    await assertSnapshot(tc, ret, {})
  },
})
