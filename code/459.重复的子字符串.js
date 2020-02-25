/*
 * @lc app=leetcode.cn id=459 lang=javascript
 *
 * [459] 重复的子字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
  var reg = new RegExp(/^(\w+)\1+$/, 'g')
  return reg.test(s)
}
export default repeatedSubstringPattern
// @lc code=end
