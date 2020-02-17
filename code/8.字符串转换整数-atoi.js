/*
 * @lc app=leetcode.cn id=8 lang=javascript
 *
 * [8] 字符串转换整数 (atoi)
 */

// @lc code=start
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
  str = str.trim()
  if(!/^[+|-]?\d+/.test(str)) return 0;
  let val = parseInt(str.match(/^[+|-]?\d+/));
  let base = Math.pow(2,31)
  let min = -base;
  let max = base-1;
  return Math.max(Math.min(val, max), min)
};
// @lc code=end

