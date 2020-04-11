/**
 * 顺序查找，即普通的遍历，属于算法的穷举法，
 */

/**
 * 二分查找
 * 如果序列是一个排序好的序列，则使用二分查找可以极大的缩短查找时间
 */

/**
 * 查找该序列中间未知的数据
 * 相等，找到
 * 要找的数据较大，则对后续部分的数据做同样的步骤
 * 要找的数据较小，则对前面部分的数据做同样的步骤
 */

class Find {
  /**
   * 实例化一个数组对象
   * @param {Array} arr 数组
   */
  constructor (arr) {
    this.arr = arr
  }
  /**
   * 顺序查找
   * @param {*} target 要查找的值
   */
  sequentialSearch (target) {
    const array = this.arr
    for (let i = 0; i < array.length; i++) {
      const element = array[i]
      if (element === target) {
        return element
      }
    }
  }
  /**
   * 二分查找
   */
  binarySearch (target) {
    const array = this.arr
    /**
     * 对数组两个区域进行查找
     * @param {*} left 左半部分
     * @param {*} right 右半部分
     */
    function _binarySearch (left, right) {
      if (left === right) {
        return array[left] === target && array[left]
      }
      if (left > right || left < 0 || right > array.length - 1) {
        return false
      }
      // 中间的数
      const mid = Math.floor((left + right) / 2)
      if (array[mid] === target) {
        return array[mid]
      }
      if (array[mid] > target) {
        return _binarySearch(left, mid - 1)
      }
      return _binarySearch(mid + 1, right)
    }
    return _binarySearch(0, array.length - 1)
  }
  /**
   * 插值查找
   */
  interpolationSearch (target) {
    const array = this.arr
    function _interpolationSearch (left, right) {
      if (left === right) {
        return array[left] === target && array[left]
      }
      if (left > right || left < 0 || right > array.length - 1) {
        return false
      }
      const mid = Math.floor(
        ((target - array[left]) / (array[right] - array[left])) * (right - left) + left
      )
      if (mid < left || mid > right) {
        return false
      }
      if (array[mid] === target) {
        return [array[mid]]
      }
      if (array[mid] > target) {
        // 在左边继续寻找
        return _interpolationSearch(left, mid - 1)
      }
      // 在右边继续寻找
      return _interpolationSearch(mid + 1, right)
    }
    return _interpolationSearch(0, array.length - 1)
  }
}

const findArr = new Find([3, 5, 6, 7, 9, 11, 22])
console.log('findArr: binarySearch', findArr.binarySearch(13))
