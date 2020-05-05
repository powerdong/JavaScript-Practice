/*
 * @Author lihaodong
 * @Date 2020/05/05
 * @TODO TODO
 */
/**
 * 最常用的排序和搜索算法，如冒泡排序、选择排序、插入排序、希尔排序、归并排序、快速排序、计数排序、桶排序、基数排序
 * 以及顺序搜索、内插搜索和二分搜索算法
 */

const { defaultCompare, swap, Compare, defaultEquals } = require('./utils/utils')
const DOES_NOT_EXIST = -1

// ====================== 排序算法 ======================

/**
 * 冒泡排序
 * *: 复杂度是 O(n²)
 * 从运行事件的角度来看，冒泡排序是最差的一个。
 * 冒泡排序比较所有相邻的两个项，如果第一个比第二个大，则交换它们。元素项向上移动至正确的顺序，就好像气泡升至表面一样，冒泡排序因此得名
 * @param {Array} arr 需要排序的数组
 * @param {Function} compare 比较函数
 * @returns {Array} 排序后的数组
 */
const bubbleSort = (arr, compareFn = defaultCompare) => {
  const array = [...arr]
  // 声明一个 length 的变量，用来存储数组的长度
  const { length } = array
  // 外循环会从数组的第一位迭代至最后一位，他控制了在数组中经过多少轮排序
  for (let i = 0; i < length; i++) {
    // 内循环从第一位迭代至倒数第二位，内循环实际上是进行当前项和下一项的比较
    for (let j = 0; j < length - 1 - i; j++) {
      // 如果这两项顺序不对，则交换它们
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1)
      }
    }
  }
  return array
}

let array = [3,2,6,2,7,8,12,56]

console.log('bubbleSort(array): ', bubbleSort(array));

/**
 * 选择排序
 * *: 复杂度是 O(n²)
 * 选择排序算法是一种原址比较排序算法。
 * 选择排序大致的思路是找到数据结构中最下值并将其放置在第一位，接着找到第二小的值并将其放在第二位
 * @param {Array} arr 需要排序的数组
 * @param {Function} compareFn 比较函数
 * @returns {Array} 排序后的数组
 */
const selectionSort = (arr, compareFn = defaultCompare) =>{
  const array = [...arr]
  const { length } = array
  let indexMin
  // 外循环迭代数组，并控制迭代轮次(数组的第 n 个值————下一个最小值)
  for (let i = 0; i < length; i++) {
    indexMin = i
    // 然后，从当前 i 的值开始至数组结束
    for (let j = i; j < length; j++) {
      // 我们比较是否位置 j 的值比当前最小值小
      if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
        // 如果是，则改变最小值至最小值
        indexMin = j
      }
    }
    // 当内循环结束，将得出数组第 n 小的值，如果该最小值和原最小值不同，则交换其值
    if (i !== indexMin) {
      swap(array, i, indexMin)
    }
  }
  return array
}
console.log('selectionSort(array): ', selectionSort(array));

/**
 * 插入排序
 * *: 复杂度是 O(n²)
 * *: 排序小型数组时，此算法比选择排序和冒泡排序性能要好
 * 插入排序每次排一个数组项，以此方式构建最后的排序数组
 * 假定第一项已经排序了，接着它和第二项进行比较————第二项是应该待在原位还是插到第一项之前呢？
 * 这样头两项就已正确排序，接着和第三项比较(他是应该插入到第一，第二，还是第三位置呢)，以此类推
 * @param {Array} arr 需要排序的数组
 * @param {Function} compareFn 比较函数
 * @returns {Array} 排序后的数组
 */
const insertionSort = (arr, compareFn = defaultCompare) => {
  const array = [...arr]
  const { length } = array
  let temp
  // 迭代数组的第 i 项找到正确的位置
  for (let i = 1; i < length; i++) {
    // 用 i 值初始化一个辅助变量，并将其值存储到一个临时变量中，便于之后将其插入到正确的位置上
    let j = i
    temp = array[i]
    // 找到正确的位置来插入项目。
    // 只有变量 j 比 0 大，并且数组前面的值比待比较的值大
    while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN)  {
      // 我们就把这个值移到当前位置上，并减小 j
      array[j] = array[j - 1]
      j--
    }
    // 最终能够将该值插入到正确的位置上
    array[j] = temp
  }
  return array
}

console.log('insertionSort(array): ', insertionSort(array));

/**
 * 归并排序
 * *: 复杂度是 O(nlog(n))
 * 在 JavaScript 的 sort 函数实现中，火狐浏览器使用归并排序，而 Chrome 使用了快速排序
 * 归并排序是第一个可以实际使用的排序算法
 * 归并排序是一种分而治之算法，其思想是将原始数组分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组
 * 由于是分治法，归并排序也是递归的。
 * @param {Array} arr 待排序的数组
 * @param {Function} compareFn 比较函数
 * @returns {Array} 排序后的数组
 */
const mergeSort = (arr, compareFn = defaultCompare) => {
  // 由于算法是递归的，我们需要一个停止条件，这里此条件是判断数组的长度是否为 1
  let array = [...arr]
  const { length } = array
  if (length > 1) {
    // 如果数组长度比 1 大，那么得将其分成小数组，找到数组的中间位
    const middle = Math.floor(length / 2)
    // 分成两个小数组，分别叫作 left 和 right
    // 自身调用函数直到 left 数组和 right 数组的大小小于等于 1
    const left = mergeSort(array.slice(0, middle), compareFn)
    const right = mergeSort(array.slice(middle, length), compareFn)
    array = merge(left, right, compareFn)
  }
  return array
}

/**
 * 负责合并和排序小数组来产生大数组
 * @param {Array} left 左半部分数组
 * @param {Array} right 右半部分数组
 * @param {Function} compareFn 比较函数
 */
const merge = (left, right, compareFn) => {
  let i = 0
  let j = 0
  const result = []
  // 迭代两个数组过程中，我们比较来自 left 数组的项是否比来自 right 数组的项小
  while (i < left.length && j < right.length) {
    // 如果是，将该项从 left 数组添加至归并结果数组
    result.push(
      // 并递增用于迭代数组的控制变量，否则从 right 数组添加项并递增用于迭代数组的控制变量
      compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]
    )
  }
  // 将 left 数组所有剩余的项添加到归并数组中，right 数组也是一样
  return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}

console.log('mergeSort(array): ', mergeSort(array));

/**
 * 快速排序
 * *: 复杂度是 O(nlog(n))
 * 性能通常比其他复杂度为 O(nlog(n)) 的排序算法要好
 * 和归并排序一样，快速排序也使用分而治之的方法，将原始数组分为较小的数组
 * 1. 首先，从数组中选择一个值作为主元，也就是数组中间的那个值
 * 2. 创建两个指针(引用)，左边一个指向数组的第一个值，右边一个指向数组最后一个值，移动左指针直到我们找到一个比主元大的值，
 *    接着，移动右指针直到找到一个比主元小的值，然后交换他们，重复这个过程，直到左指针超过右指针。这个过程将使得比主元小的
 *    值都排在主元之前，而比主元大的值都排在主元之后。这一步叫做划分
 * 3. 接着，算法对划分后的小数组(较主元小的值组成的子数组，以及较主元大的值组成子数组)重复之前的两个步骤，直至数组已完全排序
 * @param {Array} arr 待排序数组
 * @param {Function} compareFn 比较函数
 * @returns {Array} 排序后的数组
 */
const quickSort = (arr, compareFn = defaultCompare) => {
  const array = [...arr]
  return quick(array, 0, array.length - 1, compareFn)
}

/**
 * 递归函数
 * @param {Array} array 待排序数组
 * @param {Number} left 左索引
 * @param {Number} right 右索引
 * @param {Function} compareFn 比较函数
 * @returns {Array} 排序好的数组
 */
const quick = (array, left, right, compareFn) => {
  // 该变量能帮助我们将子数组分离为较小值数组和较大值数组
  let index
  // 如果数组的长度比 1 大
  if (array.length > 1) {
    index = partition(array, left, right, compareFn)
    // 如果子数组存在较小值的元素
    if (left < index - 1) {
      // 则对该组重复这个过程
      quick(array, left, index - 1, compareFn)
    }
    // 存在较大值也是如此
    if (index < right) {
      // 如果存在较大值，我们将重复快速排序过程
      quick(array, index, right, compareFn)
    }
  }
  return array
}

/**
 * 划分数组
 * @param {Array} array 待排序数组
 * @param {Number} left 左索引
 * @param {Number} right 右索引
 * @param {Function} compareFn 比较函数
 * @returns {Number} 索引
 */
const partition = (array, left, right, compareFn) => {
  // 我们选择中间值作为主元
  const pivot = array[Math.floor((right + left) / 2)]
  // 初始化两个指针: left(低), right(高)
  let i = left
  let j = right
  // 只要 left 和 right 指针没有相互交错，就执行划分操作
  while (i <= j) {
    // 移动 left 指针找到一个比主元大的元素
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
      i++
    }
    // 移动 right 指针找到一个比主元小的元素
    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
      j--
    }
    // 当左指针指向的元素比主元大且右指针指向的元素比主元小，并且此时左指针索引没有右指针索引大时
    // 左项比右项大
    if (i <= j) {
      // 我们交换他们
      swap(array, i, j)
      // 移动两个指针
      i++
      j--
    }
  }
  // 返回左指针索引
  return i
}

console.log('quickSort(array): ', quickSort(array));

/**
 * 计数排序
 * *: 时间复杂度是 O(n + k) 其中 k 是临时计数数组的大小
 * 分布式排序使用已组织好的辅助数据结构(称为桶)，然后进行合并，得到排好序的数组。
 * 计数排序使用一个用来存储每个元素在原始数组中出现次数的临时数组。
 * 在所有元素都计数完成后，临时数组已排好序并可迭代以构建排序后的结果数组
 * 它是用来排序整数的优秀算法(它是一个整数排序算法)
 * @param {Array} arr 待排序数组
 * @returns {Array} 排序好的数组
 */
const countingSort = (arr) => {
  const array = [...arr]
  // 如果待排序数组为空，或只有一个元素，则不需要运行排序算法
  if (array.length < 2) {
    return array
  }
  const maxValue = findMaxValue(array)
  // 我们需要创建计数数组，从索引 0 开始直到最大值索引 + 1
  const counts = new Array(maxValue + 1)
  // 迭代数组中的每个位置并在 counts 数组中增加元素的计数值
  array.forEach(element => {
    // 为了确保递增操作成功，如果 counts 数组中用来计数的某个元素的位置一开始没有用 0 初始化的话，我们将其赋值为 0
    if (!counts[element]) {
      counts[element] = 0
    }
    counts[element]++
  })

  let sortedIndex = 0
  // 所有元素都计数后，我们要迭代 counts 数组并构建排序后的结果数组。由于可能有多个元素有相同的值
  counts.forEach((count, i) => {
    while (count > 0) {
      // 我们将元素按照在原始数组中的出现次数进行相加
      array[sortedIndex++] = i
      count--
    }
  })
  return array
}

/**
 * 找到数组中的最大值
 * @param {Array} array 待排序数组
 * @returns {Number} 最大值
 */
const findMaxValue = (array) => {
  let max = array[0]
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i]
    }
  }
  return max
}

/**
 * 找到数组中的最小值
 * @param {Array} array 待排序数组
 * @returns {Number} 最大值
 */
const findMinValue = (array) => {
  let min = array[0]
  for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i]
    }
  }
  return min
}

console.log('countingSort(array): ', countingSort(array));

/**
 * 桶排序
 * 也是分布排序算法，它将元素分为不同的桶(较小的数组)，再使用一个简单的排序算法，例如插入排序(用来排序小数组的不错的算法)，来对每个桶进行排序
 * 如果元素非常稀疏，则使用更多的桶会更好。
 * 如果元素非常密集，则使用较少的桶会更好。
 * @param {Array} arr 待排序数组
 * @param {Number} bucketSize 有多少桶
 * @returns {Array} 排序后的数组
 */
const bucketSort = (arr, bucketSize = 5) => {
  const array = [...arr]
  if (array.length < 2) {
    return array
  }
  const buckets = createBuckets(array, bucketSize)
  return sortBuckets(buckets)
}

/**
 * 创建桶
 * @param {Array} array 数组
 * @param {Number} bucketSize 桶大小
 * @returns {Array} 桶
 */
const createBuckets = (array, bucketSize) => {
  let minValue = findMinValue(array)
  let maxValue = findMaxValue(array)
  // 计算每个桶中需要分布的元素的个数。要计算这个数，我们要使用一个公式，包含计算数组最大值和最小值的差值并与桶的大小进行除法计算
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
  // buckets 数据结构是一个矩阵， 中的每个位置包含了另一个数组
  const buckets = []
  for (let i = 0; i < bucketCount; i++) {
    buckets[i] = []
  }
  // 将元素分布到桶中。我们需要迭代数组中的每个元素
  for (let i = 0; i < array.length; i++) {
    // 计算要将元素放到哪个桶中，并将元素插入正确的桶中
    const bucketIndex = Math.floor((array[i] - minValue) / bucketSize)
    buckets[bucketIndex].push(array[i])
  }
  return buckets
}

/**
 * 将每个桶进行排序
 * @param {Array} buckets 每个桶
 * @returns {Array} 排序后的桶
 */
const sortBuckets = (buckets) => {
  // 创建一个用作结果数组的新数组，这表示原数组不会被改变，我们返回一个新的数组
  const sortedArray = []
  // 迭代每个可迭代的桶
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i] != null) {
      // 并应用插入排序
      // TODO: 这里可以根据场景应用其他的排序算法
      const temp = insertionSort(buckets[i])
      // 最后，我们将排好序的桶中的所有元素加入结果数组中
      sortedArray.push(...temp)
    }
  }
  return sortedArray
}

console.log('bucketSort(array): ', bucketSort(array));

/**
 * 基数排序
 * 根据数字的有效位或基数(这也是他为什么叫基数排序)将整数分布到桶中。
 * 基数是基于数组中值的记数制的
 * 比如，对于十进制数，使用的基数是 10。因此，算法将会使用 10 个桶来分布元素并且首先基于个位数字进行排序，然后基于十位数字，然后基于百位数字，以此类推
 * @param {Array} arr 待排序数组
 * @param {Number} radixBase 基数
 * @returns {Array} 排序后的数组
 */
const radixSort = (arr, radixBase = 10) =>{
  let array = [...arr]
  if (array.length < 2) {
    return array
  }
  let minValue = findMinValue(array)
  let maxValue = findMaxValue(array)
  // 既然基数排序也用来排序整数，我们就从最后一位开始排序所有的数
  let significantDigit = 1
  // 知道没有待排序的有效位
  while ((maxValue - minValue) / significantDigit >= 1) {
    // 基于有效位排序的代码
    array = countingSortForRadix(array, radixBase, significantDigit, minValue)
    // 首先只会基于最后一位有效位对数字进行排序，在下次迭代时，我们会基于第二个有效位进行排序...
    significantDigit *= radixBase
  }
  return array
}

const countingSortForRadix = (array, radixBase, significantDigit, minValue) => {
  let bucketsIndex
  const buckets = []
  const aux = []
  // 首先我们基于基数初始化桶
  for (let i = 0; i < radixBase; i++) {
    buckets[i] = 0
  }
  for (let i = 0; i < array.length; i++) {
    // 然后我们会基于数组中数的有效位进行计数排序
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase)
    buckets[bucketsIndex]++
  }
  // 由于我们进行的是计数排序，我们还需要计算累积结果来得到正确的计数值
  for (let i = 1; i < radixBase; i++) {
    buckets[i] += buckets[i - 1]
  }
  // 在计数完成后，要开始将值移回原始数组中。我们会使用一个临时 aux 来帮助我们
  // 对原始数组中的每个值
  for (let i = array.length - 1; i >= 0; i--) {
    // 我们会再次获取它的有效位
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase)
    // 并将它的值移动到 aux 数组中
    aux[--buckets[bucketsIndex]] = array[i]
  }
  for (let i = 0; i < array.length; i++) {
    array[i] = aux[i]
  }
  return array
}

console.log('radixSort(array): ', radixSort(array));

console.log('default array: ', array);


// ====================== 搜索算法 ======================

/**
 * 顺序或线性搜索
 * 将每个数组结构中的元素和我们要找的元素作比较
 * @param {Array} array 查找数组
 * @param {Number} value 要查找的元素
 * @param {Function} equalsFn 比较函数
 */
const sequentialSearch = (array, value, equalsFn = defaultEquals) => {
  for (let i = 0; i < array.length; i++) {
    if (equalsFn(value, array[i])) {
      return i
    }
  }
  return DOES_NOT_EXIST
}

console.log('sequentialSearch(array, 4): ', sequentialSearch(array, 8));

/**
 * 二分搜索
 * 这个算法要求被搜索的数据结构已排序
 * 1. 选择数组的中间值
 * 2. 如果选中值是待搜索值，那么算法执行完毕
 * 3. 如果待搜索值比选中值要小，则返回步骤 1 并在选中值左边的子数组中寻找
 * 4. 如果待搜索值比选中值要大，则返回步骤 1 并在选中值右边的子数组中寻找
 * @param {Array} array 数组
 * @param {Number} value 要查找的元素
 * @param {Function} compareFn 比较函数
 */
const binarySearch = (array, value, compareFn = defaultCompare) => {
  // 首先我们对数组进行排序
  const sortedArray = quickSort(array)
  // 设置 low 和 high 指针
  let low = 0
  let high = sortedArray.length - 1
  // 当 low 比 high 小时，我们计算得到中间项索引并取得中间项的值
  // 如果 low 比 high 大，则意味着该搜索值不存在并返回 -1
  while (lesserOrEquals(low, high, compareFn)) {
    // 当 low 比 high 小时，计算得到中间项索引
    const mid = Math.floor((low + high) / 2)
    // 取得中间项值
    const element = sortedArray[mid]
    // 比较选中项和搜索值
    if (compareFn(element, value) === Compare.LESS_THAN) {
      low = mid + 1
    } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
      high = mid - 1
    } else {
      return mid
    }
  }
  return DOES_NOT_EXIST
}

/**
 * 比较 low 和 high 的大小关系
 */
const lesserOrEquals = (a, b, compareFn) => (
  compareFn(a, b) === Compare.LESS_THAN || compareFn(a, b) === 0
)

console.log('binarySearch(array, 8): ', binarySearch(array, 8));

/**
 * 内插搜索
 * @param {Array} arr 要查找的数组
 * @param {Number} value 目标值
 * @param {Function} compareFn 比较函数
 * @param {Function} equalsFn 比较函数
 */
const interpolationSearch = (arr, value, compareFn = defaultCompare, equalsFn = defaultEquals) => {
  const array = quickSort(arr)
  let low = 0
  let high = array.length - 1
  return interpolation(low, high, value, array, compareFn, equalsFn)
}

const interpolation = (low, high, value, array, compareFn, equalsFn) => {
  if (equalsFn(low, high)) {
    return array[low] === value && array[low]
  }
  if (compareFn(low, high) === Compare.BIGGER_THAN || low < 0 || high > array.length - 1) {
    return false
  }
  const mid = Math.floor(
    ((value - array[low]) / (array[high] - array[low])) * (high - low) + low
  )
  if (compareFn(mid, low) === Compare.LESS_THAN || compareFn(mid, high) === Compare.BIGGER_THAN) {
    return false
  }
  if (equalsFn(array[mid],value)) {
    return mid
  }
  if (compareFn(array[mid], value) === Compare.BIGGER_THAN) {
    // 在左边继续寻找
    return interpolation(low, mid - 1, value, array, compareFn, equalsFn)
  }
  // 在右边继续寻找
  return interpolation(mid + 1, high, value, array, compareFn, equalsFn)
}

console.log('interpolationSearch(array, 8): ', interpolationSearch(array, 8));

/**
 * 随机算法
 * 迭代数组，从最后一位开始并将当前位置和一个随机位置进行交换
 * 这个随机位置比当前位置要小，这样，这个算法可以保证随机过的位置不会再被随机一次
 * @param {Array} arr 要打乱的数组
 */
const shuffle = (arr) => {
  const array = [...arr]
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    swap(array, i, randomIndex)
  }
  return array
}

console.log('shuffle(array): ', shuffle(array));