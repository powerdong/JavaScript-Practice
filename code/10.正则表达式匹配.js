/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    const res = /\.|\*+/ig
    if(!res.test(p)) {
      return s == p
    }
    
};
// @lc code=end

