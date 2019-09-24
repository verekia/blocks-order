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

const order = intervals => {
  let boundObjects = []

  intervals.forEach(interval => {
    boundObjects.push({ bound: interval.start, type: 'start', interval })
    boundObjects.push({ bound: interval.end, type: 'end', interval })
  })

  const sortedBoundObjects = _.sortBy(boundObjects, boundObject => boundObject.bound)

  let lineslastEnd = []

  sortedBoundObjects.forEach(boundObject => {
    if (boundObject.type === 'start') {
      boundObject.interval.line = findAvailableLine(lineslastEnd)
      lineslastEnd.push(boundObject.interval.end)
    } else if (boundObject.type === 'end') {
      lineslastEnd = clearLineslastEnd(boundObject.bound)
    }
  })

  return intervals
}

module.exports = { order, findAvailableLine }
