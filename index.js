const _ = require('lodash')

const findAvailableLine = (lineslastEnd, newStartBound) => {
  for (i = 0; i < lineslastEnd.length; i++) {
    if (lineslastEnd[i] < newStartBound) {
      return i
    }
  }
  return lineslastEnd.length
}

const order = intervals => {
  const sortedIntervals = _.sortBy(intervals, x => x.start)

  let boundObjects = []

  sortedIntervals.forEach(interval => {
    boundObjects.push({ bound: interval.start, type: 'start', interval })
    boundObjects.push({ bound: interval.end, type: 'end', interval })
  })

  const sortedBoundObjects = _.sortBy(boundObjects, x => x.bound)

  const lineslastEnd = []

  sortedBoundObjects.forEach(boundObject => {
    if (boundObject.type === 'start') {
      const availableLine = findAvailableLine(lineslastEnd, boundObject.bound)
      boundObject.interval.line = availableLine
      lineslastEnd[availableLine] = boundObject.interval.end
    }
  })

  return sortedIntervals
}

module.exports = { order, findAvailableLine }
