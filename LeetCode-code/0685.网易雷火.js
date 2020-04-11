/*
 * @Author: Lambda
 * @Begin: 2020-04-05 17:07:54
 * @Update: 2020-04-05 19:40:04
 * @Update log: 更新日志
 */
/**
*
* @param {Array} nums int整型一维数组 长度大于5且小于10
* @param {Number} target int整型
* @return int整型二维数组
*/
function findNumber (nums, target) {
  // write code here
  if (nums.length < 5 || nums.length > 10) {
    return false
  }
  const array = nums.slice()
  array.sort((a, b) => a - b)
  let result = []
  for (let i = 0; i < array.length - 3; i++) {
    if (i > 0 && array[i] === array[i - 1]) {
      continue
    }
    if (array[i] + array[i + 1] + array[i + 2] + array[i + 3] > target) {
      break
    }
    for (let j = i + 1; j < array.length - 2; j++) {
      if (j > i + 1 && array[j] === array[j - 1]) {
        continue
      }
      let left = j + 1
      let right = array.length - 1
      while (left < right) {
        const sum = array[i] + array[j] + array[left] + array[right]
        if (sum === target) {
          result.push([array[i], array[j], array[left], array[right]])
        }
        // 继续向后
        if (sum <= target) {
          ++left
        } else {
          --right
        }
      }
    }
  }
  console.log('result: ', result)
  return result
}

findNumber([5, 0, -6, 0, 6, -5], 0)
// module.exports = {
//   findNumber: findNumber
// }

function find1 (nums, target) {
  let result = []
  if (nums.length < 5 || nums.length > 10) {
    return result
  }
  const array = nums.slice()
  array.sort((a, b) => a - b)
  for (let i = 0; i < array.length - 3; i++) {
    if (i > 0 && array[i] === array[i - 1]) {
      continue
    }
    if (array[i] > target / 4) {
      break
    }
    for (let j = i + 1; j < array.length - 2; j++) {
      if (j > i + 1 && array[j] === array[j - 1]) {
        continue
      }
      let left = j + 1
      let right = array.length - 1
      while (left < right) {
        const sum = array[i] + array[j] + array[left] + array[right]
        if (sum === target) {
          result.push([array[i], array[j], array[left], array[right]])
          while (left < right && array[left] === array[left + 1]) {
            left++
          }
          while (left < right && array[right] === array[right - 1]) {
            right++
          }
          left++
          right--
        }
        // 继续向后
        if (sum < target) {
          left++
        } else {
          right--
        }
      }
    }
  }
  console.log('result: ', result)
  return result
}

find1([1, 2, 3, 4], 4)
