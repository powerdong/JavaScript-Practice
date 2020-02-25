/*
 * @lc app=leetcode.cn id=41 lang=javascript
 *
 * [41] 缺失的第一个正数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  // // 筛选出非正整数
  // const arr = nums.filter(item => item > 0)
  // // 正整数数组不能为空
  // if (arr.length) {
  //   // 升序排列
  //   arr.sort((a, b) => a - b)
  //   // 当没有1的时候返回1
  //   if (arr[0] !== 1) {
  //     return 1
  //   } else {
  //     // 遍历当前数组，当不连续时，后边的减去前边的不等于1，返回前边的数 + 1
  //     for (let i = 0, len = arr.length - 1; i < len; i++) {
  //       if (arr[i + 1] - arr[i] > 1) {
  //         return arr[i] + 1
  //       }
  //     }
  //     // 如果全部连续，返回最后面的数 + 1
  //     return arr.pop() + 1
  //   }
  // } else {
  //   return 1
  // }

  // ================================
  const arr = nums.filter(item => item > 0)
  // 使用快速选择排序，选出最小值，如果第一个最小值不等于1，返回1，如果不连续，返回前边的+1
  for (let i = 0, len = arr.length, min; i < len; i++) {
    min = arr[i]
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < min) {
        [arr[j], min] = [min, arr[j]]
      }
    }
    arr[i] = min
    if (i > 0) {
      if (arr[i] - arr[i - 1] > 1) {
        return arr[i - 1] + 1
      }
    } else {
      if (min !== 1) {
        return 1
      }
    }
  }
  return arr.length ? arr.pop() + 1 : 1
}
export default firstMissingPositive
// @lc code=end
