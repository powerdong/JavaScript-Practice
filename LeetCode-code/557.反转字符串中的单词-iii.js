/*
 * @lc app=leetcode.cn id=557 lang=javascript
 *
 * [557] 反转字符串中的单词 III
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 * String.prototype.split
 * String.prototype.match
 * Array.prototype.map
 * Array.prototype.reverse
 * Array.prototype.join
 */
var reverseWords = function (s) {
  // 字符串按空格进行分割，保存数组，数组的元素的先后顺序就是单词的顺序
  // 对数组进行遍历，然后每个元素进行反转
  return s.split(' ').map(item => {
    return item.split('').reverse().join('')
  }).join(' ')
}
export default reverseWords
// @lc code=end
