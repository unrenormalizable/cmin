import * as process from 'node:process'
import * as parser from './parser.js'
import * as analyzer from './analyzer.js'
import * as codegen from './codegen.js'

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const text = await Deno.readTextFile(process.argv[2])
  const program = parser.parse(text)
  const ret = analyzer.analyze(program)
  if (ret.errors.length !== 0) {
    throw new Error('analyzer returned errors', ret)
  }
  const output = codegen.emit(program)
  console.log('errors', output.errors)
  console.log('warnings', output.warnings)
  console.log('llvm ir:')
  console.log(output.output)
}
