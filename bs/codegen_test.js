import { assertSnapshot } from '@std/testing/snapshot'
import * as parser from './parser.js'
import * as analyzer from './analyzer.js'
import * as codegen from './codegen.js'

Deno.test({
  name: 'emit: trivial main function',
  fn: async (tc) => {
    const text = 'fn main() {\n}'
    const program = parser.parse(text)
    const ret = analyzer.analyze(program)
    if (ret.errors.length !== 0) {
      throw new Error('analyzer returned errors', ret)
    }
    const output = codegen.emit(program)

    await assertSnapshot(tc, output, {})
  },
})
