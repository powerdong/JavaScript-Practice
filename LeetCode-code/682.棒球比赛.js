/*
 * @lc app=leetcode.cn id=682 lang=javascript
 *
 * [682] 棒球比赛
 */

// @lc code=start
/**
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function (ops) {
  // 用数组来实现堆栈结构
  let result = []
  // 上一轮的数据
  let pre1
  let pre2
  // 对数组进行遍历，遍历的目的是处理得分
  ops.forEach(element => {
    switch (element) {
      case 'C':
        if (result.length) {
          result.pop()
        }
        break
      case 'D':
        if (result.length) {
          pre1 = result.pop()
          result.push(pre1, pre1 * 2)
        }
        break
      case '+':
        if (result.length) {
          pre1 = result.pop()
          pre2 = result.pop()
          result.push(pre2, pre1, pre1 + pre2)
        }
        break
      default:
        result.push(element * 1)
        break
    }
  })
  /**
   * total 之前遍历的结果
   * num 当前遍历的数
   */
  return result.reduce((total, num) => total + num)
}
export default calPoints
// @lc code=end
