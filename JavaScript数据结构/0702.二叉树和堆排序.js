/*
 * @Author lihaodong
 * @Date 2020/05/02
 * @TODO TODO
 */
const {
  defaultCompare,
  swap
} = require("./utils/utils");

/**
 * 二叉树是计算机科学中非常著名的数据结构，由于它能高效、快速的找出最大值和最小值、常被应用于优先队列
 *
 * 二叉堆是一种特殊的二叉树
 * 它是一棵完全二叉树，表示树的每一层都有左侧和右侧子节点(除了最后一层叶节点)，并且最后一层的叶节点尽可能都是左侧子节点，这叫做结构特性
 * 二叉树不是最小堆就是最大堆。
 * 最小堆允许你快速导出树的最小值，最大堆允许快速导出最大值。
 * 所有的节点都大于等于(最大堆)或小于等于(最小堆)每个它的子节点。这叫堆特性
 *
 * *：尽管二叉堆是二叉树，但并不一定是二叉搜索树。
 * 在二叉堆中，每个子节点都要大于等于父节点(最小堆)或小于等于父节点(最大堆)
 * 然而在二叉搜索树中，左侧子节点总是比父节点小，右侧子节点也总是更大。
 */

/**
 * 二叉树有两种表示方式。
 * 第一种是使用一个动态的表示方式，也就是指针(用节点)表示
 * 第二种是使用一个数组，通过索引值检索父节点、左侧和右侧子节点的值
 */

/**
 * 要访问使用普通数组的二叉树节点，我们可以用下面的方式操作 index
 * 对于给定位置 index 的节点
 * 1. 它的左侧子节点的位置是 2 * index + 1 (如果位置可用)
 * 2. 它的右侧子节点的位置是 2 * index + 2 (如果位置可用)
 * 3. 它的父节点位置是 index / 2 (如果位置可用)
 */

/**
 * 最小堆
 */
class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = [];
  }
  /**
   * 左侧子节点的位置
   * @param {Number} index 索引位置
   */
  getLeftIndex(index) {
    return 2 * index + 1;
  }
  /**
   * 右侧子节点位置
   * @param {Number} index 索引位置
   */
  getRightIndex(index) {
    return 2 * index + 2;
  }
  /**
   * 父节点位置
   * @param {Number} index 索引位置
   */
  getParentIndex(index) {
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2);
  }
  /**
   * 这个方法向堆中插入一个新的值
   * 如果插入成功，返回 true，否则返回 false
   * @param {Number} value 新的值
   * @returns {Boolean}
   */
  insert(value) {
    if (value != null) {
      // 向堆中插入值是将值插入堆的底部叶节点(数组的最后一个位置)
      this.heap.push(value);
      // 用这个值和它的父节点进行交换，直到父节点小于这个插入的值
      this.siftUp(this.heap.length - 1);
      return true;
    }
    return false;
  }
  /**
   * 上移操作
   * @param {Number} index 插入值的位置
   */
  siftUp(index) {
    let parent = this.getParentIndex(index);
    while (
      index > 0 &&
      this.compareFn(this.heap[parent], this.heap[index]) > 0
    ) {
      // 如果插入的值小于它的父节点，那么我么将这个元素与父节点交换
      // 重复这个过程，直到堆的根节点也经过了交换节点和父节点位置的操作
      swap(this.heap, parent, index);
      index = parent;
      parent = this.getParentIndex(index);
    }
  }
  /**
   * 移除最小值(最小堆)或最大值(最大堆)，并返回这个值
   * @returns {Number}
   */
  extract() {
    // 如果堆为空，也就是没有值可以导出，那么我们可以返回 undefined
    if (this.isEmpty()) {
      return undefined;
    }
    // 如果堆中只有一个值，我们可以直接并返回它
    if (this.size() === 1) {
      return this.heap.shift();
    }
    // 如果堆中有不止一个值，我们需要将第一个值移除，存储到一个临时变量中以便执行完下移操作后返回它。
    const removedValue = this.heap.shift();
    this.siftDown(0);
    return removedValue;
  }
  /**
   * 下移操作
   * 将元素和最小子节点(最小堆)和最大子节点(最大堆)进行交换
   * @param {Number} index 索引
   */
  siftDown(index) {
    let element = index;
    // 获取左侧子节点和右侧子节点的值
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size();
    // 如果元素比左侧子节点要小，我们就交换元素和它的左侧子节点
    if (
      left < size &&
      this.compareFn(this.heap[element], this.heap[left]) < 0
    ) {
      element = left
    }
    // 如果元素小于它的右侧子节点，我们就交换元素和它的右侧子节点
    if (
      right < size &&
      this.compareFn(this.heap[element], this.heap[right]) < 0
    ) {
      element = right
    }
    // 在找到最小子节点的位置后，我们要检验它的值是否和 element 相同
    if (index !== element) {
      // 如果不是，就将它和最小的 element 交换
      swap(this.heap, index, element)
      // 并且重复这个过程，直到 element 被放到正确的位置上
      this.siftDown(element)
    }
  }
  /**
   * 这个方法返回最小值(最小堆)或最大值(最大堆)，且不会移除这个值
   */
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0];
  }
  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
}

const heap = new MinHeap();
for (let i = 1; i < 10; i++) {
  heap.insert(i)
}
console.log('Extract minimum: ', heap.extract()); // 1


heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);

heap.insert(1);
console.log(heap);
console.log("Heap size: ", heap.size());
console.log("Heap is empty: ", heap.isEmpty());
console.log("Heap min value: ", heap.findMinimum());


class MaxHeap extends MinHeap {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = this.reverseCompare(compareFn)
  }
  reverseCompare(compareFn) {
    return (a, b) => compareFn(b, a)
  }
}

const maxHeap = new MaxHeap()
maxHeap.insert(2)
maxHeap.insert(3)
maxHeap.insert(4)
maxHeap.insert(5)

maxHeap.insert(1)
console.log("MaxHeap size: ", maxHeap.size());
console.log("MaxHeap is empty: ", maxHeap.isEmpty());
console.log("MaxHeap min value: ", maxHeap.findMinimum());


/**
 * 堆排序算法
 * 1. 用数组创建一个最大堆用作源数据
 * 2. 在创建最大堆后，最大的值会被存储在堆的第一个位置。我们要将替换为堆的最后一个值，将堆的大小减 1
 * 3. 最后，我们将堆的根节点下移并重复步骤 2 直到堆的大小为 1
 */

const heapify = (array, index, arrayLen,compareFn) => {
  let element = index;
  // 获取左侧子节点和右侧子节点的值
  const left = 2 * index + 1;
  const right = 2 * index + 2;
  const size = arrayLen;
  // 如果元素比左侧子节点要小，我们就交换元素和它的左侧子节点
  if (
    left < size &&
    compareFn(array[element], array[left]) < 0
  ) {
    element = left
  }
  // 如果元素小于它的右侧子节点，我们就交换元素和它的右侧子节点
  if (
    right < size &&
    compareFn(array[element], array[right]) < 0
  ) {
    element = right
  }
  // 在找到最小子节点的位置后，我们要检验它的值是否和 element 相同
  if (index !== element) {
    // 如果不是，就将它和最小的 element 交换
    swap(array, index, element)
    // 并且重复这个过程，直到 element 被放到正确的位置上
    heapify(element)
  }
}

/**
 * 最大堆函数会重新组织数组的顺序
 * @param {Array} array 
 * @param {Function} compareFn 
 */
const buildMaxHeap = (array, compareFn) => {
  for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
    heapify(array, i, array.length, compareFn)
  }
  return array
}

const heapSort = (array, compareFn = defaultCompare) => {
  let heapSize = array.length
  buildMaxHeap(array, compareFn)
  while (heapSize > 1) {
    swap(array, 0, --heapSize)
    heapify(array, 0, heapSize, compareFn)
  }
  return array
}

const array = [7,6,3,5,4,1,2]
console.log('Before sorting: ', array);
console.log('After sorting: ', heapSort(array));

/**
 * 堆排序算法不是一个稳定的排序算法，也就是说如果数组没有排好序，可能会得到不一样的结果。
 */