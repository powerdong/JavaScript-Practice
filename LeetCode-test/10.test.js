import isMatch from '../LeetCode-code/10.正则表达式匹配'

test('isMatch:', () => {
  expect(isMatch('aaaabc', '.*bc')).toBe(true)
})

test('isMatch:2', () => {
  expect(isMatch('aab', 'c*a*b')).toBe(true)
})

test('isMatch:3', () => {
  expect(isMatch('ab', '.*')).toBe(true)
})

test('isMatch:4', () => {
  expect(isMatch('aa', 'a*')).toBe(true)
})
