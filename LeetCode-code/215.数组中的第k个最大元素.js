/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * 输入: [3,2,1,5,6,4] 和 k = 2
  输出: 5
 */
var findKthLargest = function (nums, k) {
  // return nums.sort((a, b) => b - a)[k - 1]
  // ============== //
  let len = nums.length - 1
  for (let i = len; i > len - k; i--) {
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      }
    }
  }
  return nums[len - (k - 1)]
}
export default findKthLargest
// @lc code=end
