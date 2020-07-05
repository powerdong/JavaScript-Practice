import searchInsert from '../LeetCode-code/35.搜索插入位置'

describe('搜索插入位置', () => {
  test('should outPut 2', () => {
    expect(searchInsert([1, 3, 5, 6], 5)).toBe(2)
  })
  test('should outPut 1', () => {
    expect(searchInsert([1, 3, 5, 6], 2)).toBe(1)
  })
  test('should outPut 4', () => {
    expect(searchInsert([1, 3, 5, 6], 7)).toBe(4)
  })
  test('should outPut 0', () => {
    expect(searchInsert([1, 3, 5, 6], 0)).toBe(0)
  })
})
