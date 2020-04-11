/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个有序数组的中位数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let arr = [...nums1, ...nums2]
    arr = arr.sort((a,b) => a-b)
    let res = 0
    if(arr.length % 2) {
      const i = Math.ceil(arr.length / 2) - 1
      res = arr[i]
    } else {
      const i = arr.length / 2 - 1
      res = (arr[i] + arr[i + 1]) / 2
    }
    return res
};
// @lc code=end

