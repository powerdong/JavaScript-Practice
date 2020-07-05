/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  if (nums.length === 1) return nums[0]

  let max = nums[0]

  let pre = 0

  for (let i = 0; i < nums.length; i++) {
    // 存下来附近的数据项之和
    pre = Math.max(nums[i], nums[i] + pre)
    max = Math.max(pre, max)
  }

  return max
}
export default maxSubArray
// @lc code=end
