// @ts-check

/**
 * 贪心算法
 * 当遇到求解全局最优解问题时，如果可以将全局问题切分为小的局部问题，并寻求
 * 局部最优解，同时可以证明局部最优解的结果就是全局最优解，则可以使用贪心算法
 */

/**
 * 找零问题
 * 示例：假设你有一间小店，需要找给客户46分钱的硬币，你的货柜里只有面额为25分、10分、5分、1分的硬币，如何找零才能保证数额正确并且硬币数最小
 * @param {Number} total 需要找零多少钱
 * @param {Array} smallChangeArr 现有的零钱面额
 */
function exchange (total, smallChangeArr) {
  if (total < 0) {
    return [] // 不用找零
  }
  let max = 0
  for (let i = 0; i < smallChangeArr.length; i++) {
    const smallChange = smallChangeArr[i]
    if (smallChange > max && smallChange <= total) {
      max = smallChange
    }
  }
  // 这时 max 记录的就是局部最优解
  let result = [max]
  // 得到后续的局部最优解
  const next = exchange(total - max, smallChangeArr)
  result = result.concat(next)
  return result
}

exchange(51, [30, 25, 10, 5, 1])
console.log('exchange(51, [30, 25, 10, 5, 1]): ', exchange(51, [30, 25, 10, 5, 1]))
