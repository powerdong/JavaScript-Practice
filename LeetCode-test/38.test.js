import countAndSay from '../LeetCode-code/38.外观数列'

describe('外观数列', () => {
  test('should "1"', () => {
    expect(countAndSay(1)).toBe('1')
  })
  test('should "1211"', () => {
    expect(countAndSay(4)).toBe('1211')
  })
})
