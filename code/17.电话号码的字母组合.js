/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  // 建立电话号码的映射
  const map = ['', 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'qprs', 'tuv', 'wxyz']
  // "23" ==> [2,3]
  const numArr = digits.split('')
  // ['abc', 'def']
  let code = []
  numArr.forEach(item => {
    if (map[item]) {
      code.push(map[item])
    }
  })
  const comb = (arr) => {
    let temp = []
    for (let i = 0, len = arr[0].length; i < len; i++) {
      for (let j = 0, len = arr[1].length; j < len; j++) {
        temp.push(`${arr[0][i]}${arr[1][j]}`)
      }
    }
    arr.splice(0, 2, temp)
    if (arr.length > 1) {
      comb(arr)
    } else {
      return temp
    }
    return arr[0]
  }
  return comb(code)
}
export default letterCombinations
// @lc code=end
