/*
 * @Author: Lambda
 * @Begin: 2020-04-06 17:14:23
 * @Update: 2020-04-06 17:46:56
 * @Update log: 更新日志
 */

/**
 * 旋转数组中的最小数字
 * 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转，输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素
 * 输入数组 [3, 4, 5, 1, 2] 输出 [1, 2, 3, 4, 5] 该数组最小值为 1
 * @param {Array} arr 旋转的数组
 */
function rotateMinimumNumberInArray (arr) {
  if (arr.length === 0) return 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[i + 1]) return arr[i + 1]
  }
  return arr[0]
}

/**
 * 使用二分查找法
 * @param {Array} arr 旋转的数组
 */
function rotateMinimumNumberInArrayPlus (arr) {
  if (arr.length === 0) return 0
  // 用两个指针分别指向数组的第一个元素和最后一个元素
  let left = 0
  let right = arr.length - 1
  // 初始化 mid
  let mid = left
  // 第一个元素应该是大于或者等于最后一个元素的
  while (arr[left] >= arr[right]) {
    if (right - left === 1) {
      mid = right
      break
    }
    // 找到数组中间的元素
    mid = Math.floor((left + right) / 2)

    // 如果下标为 left right mid 指向的三个数相等，则只能顺序查找
    if (arr[left] === arr[right] && arr[mid] === arr[left]) {
      return _minInOrder(left, right)
    }
    // 如果中间的元素位于前面的递增子数组，那么它应该大于或者等于左指针指向的元素
    if (arr[mid] >= arr[left]) {
      // 数组中最小的元素应该位于该中间元素元素的后面
      left = mid
    } else if (arr[mid] <= arr[right]) {
      // 如果中间元素位于后面的递增子数组，那么它应该小于或者等于右指针指向的元素
      right = mid
    }
  }
  // 左指针总是指向前面递增数组的元素，右指针总是指向后面递增的数组
  // 最终左指针将指向前面子数组的最后一个元素，右指针会指向后面子数组的第一个元素。
  // 他们会指向两个相邻的元素，并且最小的数字一定位于右指针指向的那个元素

  function _minInOrder (index1, index2) {
    let result = arr[index1]
    for (let i = index1 + 1; i <= index2; i++) {
      if (result > arr[i]) {
        result = arr[i]
      }
    }
    return result
  }

  return arr[mid]
}

console.log('rotateMinimumNumberInArray([3, 4, 5, 1, 2]): ', rotateMinimumNumberInArray([3, 4, 5, 1, 2]))
console.log('rotateMinimumNumberInArrayPlus([3, 4, 5, 6, 7, 1, 2, 3]): ', rotateMinimumNumberInArrayPlus([3, 4, 5, 6, 7, 1, 2, 3]))
