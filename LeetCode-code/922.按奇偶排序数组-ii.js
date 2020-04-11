/*
 * @lc app=leetcode.cn id=922 lang=javascript
 *
 * [922] 按奇偶排序数组 II
 */

// @lc code=start
/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParityII = function (A) {
  // 进行升序排列
  A.sort((a, b) => a - b)
  // 记录奇数，偶数下标
  let odd = 1
  let even = 0
  // 用来保存最终的数据
  let result = []
  A.forEach(item => {
    if (item % 2 === 1) {
      result[odd] = item
      odd += 2
    } else {
      result[even] = item
      even += 2
    }
  })
  return result
}
export default sortArrayByParityII
// @lc code=end
