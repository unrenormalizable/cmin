import { assertSnapshot } from '@std/testing/snapshot'
import * as main from './main.js'

// Build executable using:
// & "C:\Program Files\LLVM\bin\clang.exe"  -Wno-override-module -o example.exe example.ll -fuse-ld=lld "-Wl,/SUBSYSTEM:CONSOLE,/DEFAULTLIB:libcmt,/DEBUG:FULL"

Deno.test({
  name: 'scan: empty file',
  fn: async (tc) => {
    const text = ''
    const tokens = main.scanAll(text)

    await assertSnapshot(tc, tokens, {})
  },
})

Deno.test({
  name: 'scan: random error token',
  fn: async (tc) => {
    const text = '   \r#  \r\n  \n  '
    const tokens = main.scanAll(text)

    await assertSnapshot(tc, tokens, {})
  },
})

Deno.test({
  name: 'scan: empty file with whitespace',
  fn: async (tc) => {
    const text = '   \r\t  \r\n  \n  '
    const tokens = main.scanAll(text)

    await assertSnapshot(tc, tokens, {})
  },
})

Deno.test({
  name: 'scan: trivial main function',
  fn: async (tc) => {
    const text = 'fn main() {\n}'
    const tokens = main.scanAll(text)

    await assertSnapshot(tc, tokens, {})
  },
})

Deno.test({
  name: 'parse: empty file',
  fn: async (tc) => {
    const text = ''
    const ret = main.parse(text)

    await assertSnapshot(tc, ret, {})
  },
})

Deno.test({
  name: 'parse: empty file with whitespace',
  fn: async (tc) => {
    const text = '   \r\t  \r\n  \n  '
    const ret = main.parse(text)

    await assertSnapshot(tc, ret, {})
  },
})

Deno.test({
  name: 'parse: random scanner error',
  fn: async (tc) => {
    const text = '   \r#  \r\n  \n  '
    const ret = main.parse(text)

    await assertSnapshot(tc, ret, {})
  },
})

Deno.test({
  name: 'parse: trivial main function',
  fn: async (tc) => {
    const text = 'fn main() {\n}'
    const ret = main.parse(text)

    await assertSnapshot(tc, ret, {})
  },
})

Deno.test({
  name: 'analyze: override puts function',
  fn: async (tc) => {
    const text = 'fn __puts() {\n}'
    const ret = main.analyse(main.parse(text))

    await assertSnapshot(tc, ret, {})
  },
})

Deno.test({
  name: 'emit: trivial main function',
  fn: async (tc) => {
    const text = 'fn main() {\n}'
    const program = main.parse(text)
    const ret = main.analyse(program)
    if (ret.errors.length !== 0) {
      throw new Error('analyzer returned errors', ret)
    }
    const output = main.emit(program)

    await assertSnapshot(tc, output, {})
  },
})
