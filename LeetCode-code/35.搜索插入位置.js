/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      return i
    }
    if (i > 0 && nums[i] > target && nums[i - 1] < target) {
      return i
    }
    if (i === 0 && nums[i] > target) {
      return 0
    }
    if (i === nums.length - 1 && nums[i] < target) {
      return nums.length
    }
  }
}
export default searchInsert
// @lc code=end
