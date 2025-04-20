export function analyze(program) {
  const warnings = []
  const errors = []

  let foundMain = false
  for (let i = 0; i < program.ast.functions.length; i++) {
    if (program.ast.functions[i].name === '__puts') {
      warnings.push({ token: program.ast.functions[i].token, message: 'redefining C imports.' })
    }
    if (program.ast.functions[i].name === 'main') {
      foundMain = true
    }
  }
  if (!foundMain) {
    errors.push({ location: { line: 0, column: 0 }, message: 'missing main function' })
  }

  return { warnings, errors }
}
