import hasGroupsSizeX from '../code/914.卡牌分组'

test('has groups size x: [1,2,3,4,4,3,2,1]', () => {
  expect(hasGroupsSizeX([1, 2, 3, 4, 4, 3, 2, 1])).toBe(true)
})

test('has groups size x: [1]', () => {
  expect(hasGroupsSizeX([1])).toBe(false)
})

test('has groups size x: [0,0,0,1,1,1,2,2,2]', () => {
  expect(hasGroupsSizeX([0, 0, 0, 1, 1, 1, 2, 2, 2])).toBe(true)
})
