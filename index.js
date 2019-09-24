const sortBy = require('lodash/sortBy')

const findAvailableLine = (linesLastEnd, value) => {
  const index = linesLastEnd.findIndex(x => x < value)
  return index === -1 ? linesLastEnd.length : index
}

const order = intervals => {
  const sortedIntervals = sortBy(intervals, x => x.start)

  const boundObjects = []

  sortedIntervals.forEach(interval => {
    boundObjects.push({ bound: interval.start, type: 'start', interval })
    boundObjects.push({ bound: interval.end, type: 'end', interval })
  })

  const sortedBoundObjects = sortBy(boundObjects, x => x.bound)

  const linesLastEnd = []

  sortedBoundObjects.forEach(boundObject => {
    if (boundObject.type === 'start') {
      const availableLine = findAvailableLine(linesLastEnd, boundObject.bound)
      boundObject.interval.line = availableLine
      linesLastEnd[availableLine] = boundObject.interval.end
    }
  })

  return sortedIntervals
}

module.exports = { order, findAvailableLine }
