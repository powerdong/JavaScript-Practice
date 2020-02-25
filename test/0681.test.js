import sortArr from '../code/0681.冒泡排序'

test('冒泡排序:', () => {
  expect(sortArr([1, 3, 4, 8, 2, 7, 2, 8, 3, 0])).toEqual([0, 1, 2, 2, 3, 3, 4, 7, 8, 8])
})
