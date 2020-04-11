/*
 * @lc app=leetcode.cn id=93 lang=javascript
 *
 * [93] 复原IP地址
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  let result = []

  function helper (s, last, segments) {
    if (segments === 3) {
      if (s.length <= 3 && parseInt(s.slice(0, 3)) <= 255) {
        if (s.length >= 2 && s.charAt(0) === '0') {
          return
        }
        let item = last.concat(s)
        result.push(item)
        return
      }
    }
    if (segments < 3) {
      let item = last.concat(s.slice(0, 1)).concat('.')
      helper(s.slice(1), item, segments + 1)
      if (s.charAt(0) !== '0') {
        item = last.concat(s.slice(0, 2)).concat('.')
        helper(s.slice(2), item, segments + 1)
        if (parseInt(s.slice(0, 3)) <= 255) {
          item = last.concat(s.slice(0, 3)).concat('.')
          helper(s.slice(3), item, segments + 1)
        }
      }
    }
  }
  helper(s, '', 0)
  return result
}
export default restoreIpAddresses
// @lc code=end
