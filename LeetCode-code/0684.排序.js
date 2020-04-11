/**
 * 冒泡排序
 * 一次冒泡排序，可以将某个区域序列的最大值排序到该区域的最后一位
 */

/**
 * 冒泡排序效率一般。在各种情况下不会太好，也不会太差
 * 如果数组本身是有序的，冒泡排序还是不错的
 */

/**
 * 插入排序
 * 将序列分为两个部分，一部分是有序的，一部分是无序的，现在要做的是，就是不断的从无序的部分取出数据，加入到有序的部分，直到整个排序完成
 */

/**
 * 插入排序在小规模的数组中效率很高，如果数组本身是比较有序的，则效率会进一步提升
 * V8引擎在数组比较小的时候会使用插入排序
 */

/**
 * 快速排序
 * 选择一个数(比如序列的最后一列)作为基准数，将整个序列排序成两部分，一部分比该数小，另一部分比该数大，基准数在中间，然后对剩余的序列做同样的事情，直到排序完成
 */

/**
 * 当数组比较大并且比较混乱的时候，使用快速排序效率很高
 * V8引擎在数组较大时会自动使用快速排序
 */

/**
 * 实例化一个排序属性
 * 传入一个数组
 */
class Sort {
  constructor (arr) {
    this.arr = arr
  }
  /**
   * 两两交换
   * @param {*} arr 数组
   * @param {*} i1 数组索引
   * @param {*} i2 数组索引
   */
  swap (arr, i1, i2) {
    [arr[i1], arr[i2]] = [arr[i2], arr[i1]]
  }
  /**
   * 冒泡排序
   */
  bubbleSort () {
    const array = this.arr
    // 循环 len - 1 次
    for (let i = 0; i < array.length - 1; i++) {
      // 内部循环返回 0 ~ len - i - 2, 相邻比较
      // 每次循环都会找到最大的项放到数组最右边
      for (let j = 0; j <= array.length - i - 2; j++) {
        if (array[j] > array[j + 1]) {
          // 将第1位和第2位进行比较，如果前者比后者大则交换
          // 将第2位和第3位进行比较，如果前者比后者大则交换
          // 以此类推，直到比较到该区域的最后两位
          this.swap(array, j, j + 1)
        }
      }
    }
    return array
  }
  /**
   * 插入排序
   */
  insertSort () {
    const array = this.arr
    /**
     * 例如：序列[5, 2, 7, 3, 6]
     5) 不断的扩充有序序列  (2  3  5  6  7)
     */
    for (let i = 1; i < array.length; i++) {
      // 1) 分为有序的序列和无序的序列  (5) (2 7 3 6)
      if (array[i] < array[i - 1]) {
        // 搞定 i ~ 0
        var tmp = array[i] // 2   i = 1
        let j
        for (j = i; j >= 0; j--) {
          if (j > 0 && tmp < array[j - 1]) {
            // j 前面有东西并且比 tmp 大
            array[j] = array[j - 1]
            // 2) 不断的扩充有序序列  (2 5) (7  3  6)
          } else {
            break
          }
        }
        array[j] = tmp
      }
    }
    return array
  }
  /**
   * 快速排序
   * [5, 7, 2, 3, 6, 4]
   */
  quickSort () {
    const array = this.arr
    /**
     * 对数组中的指定范围进行排序
     * @param {*} left 左边指针
     * @param {*} right 右边指针
     */
    function _quickSort (left, right) {
      if (left < 0 || right > array.length - 1 || left >= right) {
        return false
      }
      // 拿一个基准数
      let key = array[right]
      let low = left
      let high = right
      while (low < high) {
        while (array[low] < key && low < high) {
          low++
        }
        // 当遍历到比基准值大的数,将大的移过去
        array[high] = array[low]
        while (array[high] >= key && low < high) {
          high--
        }
        // 当遍历到比基准值小的数，将小的移过来
        array[low] = array[high]
      }
      // 保证循环结束后，low === high
      // [3,2,4,7,6,5]
      array[low] = key
      // 搞定左边
      _quickSort(left, low - 1)
      // 搞定右边
      _quickSort(low + 1, right)
    }
    // 一开始，在0~最大小标之间进行排序
    _quickSort(0, array.length - 1)
    return array
  }
}

const arr = new Sort([5, 7, 2, 3, 6, 4])
// console.log('arr.bubbleSort(): ', arr.bubbleSort())
// console.log('arr.insertSort(): ', arr.insertSort())
console.log('arr.quickSort(): ', arr.quickSort())
