/*
 * @lc app=leetcode.cn id=696 lang=javascript
 *
 * [696] 计数二进制子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function (s) {
  let n = 0
  // 10101
  // ["1", "0", "1", "0", "1"]
  const arr = s.match(/([1]+)|([0]+)/g)
  for (let i = 0; i < arr.length - 1; i++) {
    n += Math.min(arr[i].length, arr[i + 1].length)
  }
  return n
}
export default countBinarySubstrings
// @lc code=end
