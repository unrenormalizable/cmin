import * as scanner from './scanner.js'

export const AST_NODE_PROGRAM = 0
export const AST_NODE_FUNCTION = 0

export const PARSE_ACCEPTED = 0
export const PARSE_NOT_YET_ACCEPTED = 1
export const PARSE_NOT_ACCEPTED = 2

function readToken(state, tokenId, tokenValue) {
  if (state.scanState.token.id === tokenId && (!tokenValue || state.scanState.token.value === tokenValue)) {
    const scanState = scanner.scan(state.text, state.scanState.state)
    state.scanState = scanState
    state.result = PARSE_NOT_YET_ACCEPTED
  } else {
    state.result = PARSE_NOT_ACCEPTED
  }

  return state
}

function parseFunction(state) {
  state = { ...state }

  state = readToken(state, scanner.TOK_KEYWORD, 'fn')
  if (state.result === PARSE_NOT_ACCEPTED) {
    return state
  }

  const fnAst = { id: AST_NODE_FUNCTION, name: null, return: 'void', statements: [] }
  fnAst.name = state.scanState.token.value
  fnAst.token = state.scanState.token

  state = readToken(state, scanner.TOK_IDENTIFIER)
  if (state.result === PARSE_NOT_ACCEPTED) {
    return state
  }

  state = readToken(state, scanner.TOK_SYMBOL, '(')
  if (state.result === PARSE_NOT_ACCEPTED) {
    return state
  }

  state = readToken(state, scanner.TOK_SYMBOL, ')')
  if (state.result === PARSE_NOT_ACCEPTED) {
    return state
  }

  state = readToken(state, scanner.TOK_SYMBOL, '{')
  if (state.result === PARSE_NOT_ACCEPTED) {
    return state
  }

  state = readToken(state, scanner.TOK_SYMBOL, '}')
  if (state.result === PARSE_NOT_ACCEPTED) {
    return state
  }

  state.ast.functions.push(fnAst)
  state.result = PARSE_NOT_YET_ACCEPTED
  return state
}

function parseFunctionList(state) {
  state = { ...state }

  if (state.scanState.token.id === scanner.TOK_EOF) {
    state.result = PARSE_NOT_YET_ACCEPTED
    return state
  }

  state = parseFunction(state)
  if (state.result === PARSE_NOT_ACCEPTED) {
    return state
  }

  return parseFunctionList(state)
}

function parseProgram(state) {
  state = { ...state }
  state.ast = { id: AST_NODE_PROGRAM, functions: [] }

  state = parseFunctionList(state)
  if (state.result === PARSE_NOT_ACCEPTED) {
    return state
  }

  state.result = PARSE_ACCEPTED
  return state
}

export function parse(text) {
  const scanState = scanner.scan(text, { pos: 0, line: 1, column: 1 })
  const state = { text, result: PARSE_NOT_YET_ACCEPTED, scanState }

  return parseProgram(state)
}
