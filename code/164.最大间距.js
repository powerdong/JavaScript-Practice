/*
 * @lc app=leetcode.cn id=164 lang=javascript
 *
 * [164] 最大间距
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function (nums) {
  // if (nums.length < 2) {
  //   return 0
  // }
  // nums.sort((a, b) => a - b)
  // let max = 0
  // for (let i = 0, len = nums.length - 1, tmp; i < len; i++) {
  //   tmp = nums[i + 1] - nums[i]
  //   if (tmp > max) {
  //     max = tmp
  //   }
  // }
  // return max

  if (nums.length < 2) {
    return 0
  }
  let max = 0
  let len = nums.length - 1
  let space
  for (let i = len, tmp; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      tmp = nums[j]
      if (tmp > nums[j + 1]) {
        nums[j] = nums[j + 1]
        nums[j + 1] = tmp
      }
    }
    if (i < len) {
      space = nums[i + 1] - nums[i]
      if (space > max) {
        max = space
      }
    }
  }
  return Math.max(max, nums[1] - nums[0])
}
export default maximumGap
// @lc code=end
