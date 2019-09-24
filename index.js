const _ = require('lodash')

const findAvailableLine = (lineslastEnd, newStartBound) => {
  for (i = 0; i < lineslastEnd.length; i++) {
    if (lineslastEnd[i] < newStartBound) {
      return i
    }
  }
  return lineslastEnd.length
}

const clearLineslastEnd = (lineslastEnd, newEndBound) => {
  const newLineslastEnd = []
  for (i = 0; i < lineslastEnd.length; i++) {
    if (lineslastEnd[i] < newEndBound) {
      return
    } else {
      newLineslastEnd.push(lineslastEnd[i])
    }
  }
  return newLineslastEnd
}

const order = blocks => {
  let boundObjects = []

  blocks.forEach(block => {
    boundObjects.push({ bound: block.start, type: 'start', block })
    boundObjects.push({ bound: block.end, type: 'end', block })
  })

  const sortedBoundObjects = _.sortBy(boundObjects, boundObject => boundObject.bound)

  let lineslastEnd = []

  sortedBoundObjects.forEach(boundObject => {
    if (boundObject.type === 'start') {
      boundObject.block.line = findAvailableLine(lineslastEnd)
      lineslastEnd.push(boundObject.block.end)
    } else if (boundObject.type === 'end') {
      lineslastEnd = clearLineslastEnd(boundObject.bound)
    }
  })

  return blocks
}

module.exports = { order, findAvailableLine }
