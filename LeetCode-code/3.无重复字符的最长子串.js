/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 * abcabcabc
 */
var lengthOfLongestSubstring = function(s) {
    let len = 0, str = '', start = 0
    for (const i of s) {
      if(str.indexOf(i) == -1) {
        str += i
        start ++
        len = Math.max(len, start)
      } else {
        str += i
        str = str.slice(str.indexOf(i) + 1)
        start = str.length
      } 
    }
    return len
};
// @lc code=end

