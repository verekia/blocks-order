const { order, findAvailableLine } = require('.')

test('findAvailableLine 0', () => {
  const linesLastEnds = []
  expect(findAvailableLine(linesLastEnds, 2)).toBe(0)
})

test('findAvailableLine 1', () => {
  const linesLastEnds = [3]
  expect(findAvailableLine(linesLastEnds, 4)).toBe(0)
  expect(findAvailableLine(linesLastEnds, 3)).toBe(1)
  expect(findAvailableLine(linesLastEnds, 2)).toBe(1)
})

test('findAvailableLine 2', () => {
  const linesLastEnds = [3, 6]
  expect(findAvailableLine(linesLastEnds, 4)).toBe(0)
  expect(findAvailableLine(linesLastEnds, 3)).toBe(2)
  expect(findAvailableLine(linesLastEnds, 1)).toBe(2)
})

// Visualization:
// https://docs.google.com/spreadsheets/d/1uWGKCSQq1WoX6AtJIxFpqhNIeRtRH2SQSLTCXGzH-fI/edit?usp=sharing

test('case1 - no overlap', () => {
  const intervals = [
    { start: 0, end: 2 },
    { start: 4, end: 6 },
    { start: 7, end: 9 },
  ]
  const expected = [
    { start: 0, end: 2, line: 0 },
    { start: 4, end: 6, line: 0 },
    { start: 7, end: 9, line: 0 },
  ]
  expect(order(intervals)).toEqual(expected)
})

test('case2 - alternated', () => {
  const intervals = [
    { start: 0, end: 2 },
    { start: 1, end: 4 },
    { start: 4, end: 6 },
    { start: 6, end: 8 },
    { start: 8, end: 9 },
  ]
  const expected = [
    { start: 0, end: 2, line: 0 },
    { start: 1, end: 4, line: 1 },
    { start: 4, end: 6, line: 0 },
    { start: 6, end: 8, line: 1 },
    { start: 8, end: 9, line: 0 },
  ]
  expect(order(intervals)).toEqual(expected)
})

test('case3 - waterfall', () => {
  const intervals = [
    { start: 0, end: 4 },
    { start: 1, end: 6 },
    { start: 2, end: 8 },
  ]
  const expected = [
    { start: 0, end: 4, line: 0 },
    { start: 1, end: 6, line: 1 },
    { start: 2, end: 8, line: 2 },
  ]
  expect(order(intervals)).toEqual(expected)
})

test('case4 - hardcore', () => {
  const intervals = [
    { start: 0, end: 2 },
    { start: 1, end: 4 },
    { start: 2, end: 5 },
    { start: 4, end: 5 },
    { start: 6, end: 8 },
    { start: 6, end: 7 },
    { start: 7, end: 9 },
    { start: 8, end: 9 },
    { start: 9, end: 12 },
    { start: 10, end: 10 },
    { start: 11, end: 13 },
    { start: 12, end: 14 },
    { start: 14, end: 16 },
    { start: 14, end: 15 },
    { start: 16, end: 16 },
    { start: 16, end: 16 },
  ]
  const expected = [
    { start: 0, end: 2, line: 0 },
    { start: 1, end: 4, line: 1 },
    { start: 2, end: 5, line: 2 },
    { start: 4, end: 5, line: 0 },
    { start: 6, end: 8, line: 0 },
    { start: 6, end: 7, line: 1 },
    { start: 7, end: 9, line: 2 },
    { start: 8, end: 9, line: 1 },
    { start: 9, end: 12, line: 0 },
    { start: 10, end: 10, line: 1 },
    { start: 11, end: 13, line: 1 },
    { start: 12, end: 14, line: 2 },
    { start: 14, end: 16, line: 0 },
    { start: 14, end: 15, line: 1 },
    { start: 16, end: 16, line: 1 },
    { start: 16, end: 16, line: 2 },
  ]
  expect(order(intervals)).toEqual(expected)
})
