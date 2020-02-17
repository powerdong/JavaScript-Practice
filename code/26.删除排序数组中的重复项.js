/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let j = 0
    for (let i = 0; i < nums.length; i++) {
      if(nums[i] != nums[i+1] ) {
        j++
        nums[j] = nums[i]
      }
    }
    return j+1
};
// removeDuplicates([1,1,1,2,4,5,7,7])
// @lc code=end

