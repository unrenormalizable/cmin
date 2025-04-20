export const TOK_ERROR = 0
export const TOK_EOF = 1
export const TOK_WHITESPACE = 2
export const TOK_KEYWORD = 3
export const TOK_IDENTIFIER = 4
export const TOK_SYMBOL = 4

function getCurrChar(text, state) {
  return state.pos + 0 < text.length ? text[state.pos + 0] : null
}

function getNextChar(text, state) {
  return state.pos + 1 < text.length ? text[state.pos + 1] : null
}

function isWhitespace(char) {
  return char !== null && char.match(/\s/)
}

function isAlphabetic(char) {
  return char !== null && char.match(/[A-Za-z_]/)
}

function isNumeric(char) {
  return char !== null && char.match(/[0-9]/)
}

function isAlphanumeric(char) {
  return isAlphabetic(char) || isNumeric(char)
}

function isSymbol(char) {
  return char !== null && char.match(/[\(\)\{\}]/)
}

function isKeyword(str) {
  return (str === 'fn')
}

export function scan(text, state) {
  state = { ...state }

  // WHITESPACE token.
  while (isWhitespace(getCurrChar(text, state))) {
    while (true) {
      const currChar = getCurrChar(text, state)
      const nextChar = getNextChar(text, state)

      if (currChar === '\t' || currChar === ' ') {
        state.pos++
        state.column++
        continue
      }

      if ((currChar === '\r' && nextChar === '\n')) {
        state.pos += 2
        state.line++
        state.column = 1
        continue
      }

      if (currChar === '\r' || currChar === '\n') {
        state.pos++
        state.line++
        state.column = 1
        continue
      }

      break
    }
  }

  // EOF token.
  if (getCurrChar(text, state) === null) {
    return { token: { id: TOK_EOF, value: null, location: state }, state }
  }

  // KEYWORD or IDENTIFIER token.
  if (isAlphabetic(getCurrChar(text, state))) {
    const location = { ...state }
    while (isAlphanumeric(getCurrChar(text, state))) {
      state.pos++
      state.column++
    }

    const value = text.slice(location.pos, state.pos)
    const id = isKeyword(value) ? TOK_KEYWORD : TOK_IDENTIFIER
    return { token: { id, value, location }, state }
  }

  // SYMBOL token.
  if (isSymbol(getCurrChar(text, state))) {
    const location = { ...state }
    state.pos++
    state.column++
    return { token: { id: TOK_SYMBOL, value: text.slice(location.pos, state.pos), location }, state }
  }

  // ERROR token.
  return { token: { id: TOK_ERROR, value: null, location: state }, state }
}

export function scanAll(text) {
  let ret = { state: { pos: 0, line: 1, column: 1 } }
  const tokens = []
  while (true) {
    ret = scan(text, ret.state)
    tokens.push(ret.token)
    if (ret.token.id === TOK_EOF || ret.token.id === TOK_ERROR) {
      break
    }
  }

  return tokens
}
