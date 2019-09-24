const { order, findAvailableLine } = require('.')

test('findAvailableLine 0', () => {
  const linesLastEnds = []
  expect(findAvailableLine(linesLastEnds, 100)).toBe(0)
})

test('findAvailableLine 1', () => {
  const linesLastEnds = [200]
  expect(findAvailableLine(linesLastEnds, 300)).toBe(0)
  expect(findAvailableLine(linesLastEnds, 150)).toBe(1)
})

test('findAvailableLine 2', () => {
  const linesLastEnds = [200, 300]
  expect(findAvailableLine(linesLastEnds, 350)).toBe(0)
  expect(findAvailableLine(linesLastEnds, 250)).toBe(0)
  expect(findAvailableLine(linesLastEnds, 150)).toBe(2)
})


test('case1 - no overlap', () => {
  const blocks = [
    { start: 100, end: 200 },
    { start: 210, end: 300 },
    { start: 310, end: 400 },
  ]
  const expected = [
    { start: 100, end: 200, line: 0 },
    { start: 210, end: 300, line: 0 },
    { start: 310, end: 400, line: 0 },
  ]
  expect(order(blocks)).toEqual(expected)
})

test('case2 - alternated', () => {
  const blocks = [
    { start: 100, end: 200 },
    { start: 170, end: 300 },
    { start: 250, end: 400 },
  ]
  const expected = [
    { start: 100, end: 200, line: 0 },
    { start: 170, end: 300, line: 1 },
    { start: 250, end: 400, line: 0 },
  ]
  expect(order(blocks)).toEqual(expected)
})

test('case3 - waterfall', () => {
  const blocks = [
    { start: 100, end: 200 },
    { start: 120, end: 220 },
    { start: 140, end: 240 },
  ]
  const expected = [
    { start: 100, end: 200, line: 0 },
    { start: 120, end: 220, line: 1 },
    { start: 140, end: 240, line: 2 },
  ]
  expect(order(blocks)).toEqual(expected)
})

