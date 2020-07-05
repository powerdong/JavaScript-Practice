/*
 * @lc app=leetcode.cn id=38 lang=javascript
 *
 * [38] 外观数列
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
  let _series = '1'
  if (n === 1) {
    return _series
  }
  const _countAndSay = (series) => {
    let _n = 1
    let result = ''
    for (let i = 0; i < series.length; i++) {
      if (series[i] === series[i + 1]) {
        _n++
      } else {
        result += _n + series[i]
        _n = 1
      }
    }
    n--
    return n === 1 ? result : _countAndSay(result)
  }
  return _countAndSay(_series)
}
// countAndSay(4)
export default countAndSay
// @lc code=end
