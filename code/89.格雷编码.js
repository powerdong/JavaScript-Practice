/*
 * @lc app=leetcode.cn id=89 lang=javascript
 *
 * [89] 格雷编码
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function (n) {
  if (n === 0) {
    return [0]
  }
  let make = (n) => {
    if (n === 1) {
      return [0, 1]
    }
    let prev = make(n - 1)
    let result = []
    let max = Math.pow(2, n) - 1
    for (let i = 0, len = prev.length; i < len; i++) {
      result[i] = `0${prev[i]}`
      result[max - i] = `1${prev[i]}`
    }
    return result
  }
  let binary = make(n)
  binary = binary.map(item => {
    return parseInt(item, 2)
  })
  return binary
}
export default grayCode
// @lc code=end
