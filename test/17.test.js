import letterCombinations from '../code/17.电话号码的字母组合'

const inText = '23'
const outText = ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']

test('letter combinations: 23', () => {
  //  If it should pass with deep equality, replace "toBe" with "toStrictEqual"
  expect(letterCombinations(inText)).toStrictEqual(outText)
})
