const sortBy = require('lodash/sortBy')

const findAvailableLine = (lineslastEnd, newStartBound) => {
  const index = lineslastEnd.findIndex(x => x < newStartBound)
  return index === -1 ? lineslastEnd.length : index
}

const order = intervals => {
  const sortedIntervals = sortBy(intervals, x => x.start)

  const boundObjects = []

  sortedIntervals.forEach(interval => {
    boundObjects.push({ bound: interval.start, type: 'start', interval })
    boundObjects.push({ bound: interval.end, type: 'end', interval })
  })

  const sortedBoundObjects = sortBy(boundObjects, x => x.bound)

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
