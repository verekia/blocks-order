const order = blocks => {
  let currentLine = 0

  blocks.forEach((b, i) => {
    b.line = currentLine // That's what we have to fix
  })

  return blocks
}

module.exports = order
