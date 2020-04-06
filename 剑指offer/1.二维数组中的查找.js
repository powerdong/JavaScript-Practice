/*
 * @Author: Lambda
 * @Begin: 2020-04-06 15:05:35
 * @Update: 2020-04-06 15:22:37
 * @Update log: 更新日志
 */

/**
 * 在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下的递增的顺序排序
 * 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组总是否含有该整数
 * 1  2  8  9
 * 2  4  9  12
 * 4  7  10  13
 * 6  8  11  15
 * @param {Number} target 目标值
 * @param {Array} array 二维数组
 */
function Find (target, array) {
  const n = array.length
  const m = array[0].length
  let row = n - 1
  let col = 0
  // 如果当前传进来的数组为空，返回
  if (m === 0 && n === 0) {
    return false
  }
  // 对行，列进行循环操作
  while (row >= 0 && col <= m - 1) {
    if (array[row][col] > target) {
      // 如果当前值大于目标值，超过了，回退一下
      row--
    } else if (array[row][col] < target) {
      // 如果当前值小于目标值，还不够继续找下一列
      col++
    } else if (array[row][col] === target) {
      return true
    }
  }
  return false
}

// 初始化这个二维数组
const arr = Array(4)
arr[0] = [1, 2, 8, 9]
arr[1] = [2, 4, 9, 12]
arr[2] = [4, 7, 10, 13]
arr[3] = [6, 8, 11, 15]

console.log('Find(8, arr): ', Find(8, arr))
