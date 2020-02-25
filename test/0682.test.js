import selectSort from '../code/0682.选择排序'

test('选择排序:', () => {
  expect(selectSort([1, 3, 4, 8, 2, 7, 2, 8, 3, 0])).toEqual([0, 1, 2, 2, 3, 3, 4, 7, 8, 8])
})
