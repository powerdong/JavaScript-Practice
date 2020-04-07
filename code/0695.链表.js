/**
 * 要存储多个元素，数组(或列表)可能是最常用的数据结构
 * 缺点：数组的大小是固定的，从数组的起点或中间插入或移出项的成本很高，因为需要移动元素
 *
 * 链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。
 * 每个元素由一个存储元素本身的节点和一个指向下一个元素的引用(也称指针或链接)组成
 *
 * 相对于传统数组，链表的一个好处在于，添加说移除元素的时候不需要移动其他元素
 * 在数组中，我们可以直接访问任何位置的任何元素，而要想访问链表中间的一个元素，则需要从起点(表头)开始迭代链表知道找到所需元素
 */

const { defaultEquals } = require('./utils/utils')
const { Node } = require('./models/linked-list-models')

class LinkedList {
  constructor (equalsFn = defaultEquals) {
    // 用来存储链表中元素数量
    this.count = 0
    this.head = undefined
    // 作为相等比较函数
    this.equalsFn = equalsFn
  }
  /**
   * 向链表尾部添加一个新元素
   * @param {any} element 新元素
   */
  push (element) {
    // 创建 Node 项
    const node = new Node(element)
    let current
    // 如果链表为空
    if (this.head == null) {
      // this.head == null 等价 this.head === undefined || this.head === null
      this.head = node
    } else {
      current = this.head
      // 获取最后一项
      while (current.next != null) {
        current = current.next
      }
      // 将其 next 赋为新元素，建立连接
      current.next = node
    }
    // 新增成功
    this.count++
  }
  /**
   * 删除链表中的指定元素
   * @param {*} element 指定元素
   */
  remove (element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }
  /**
   * 向链表的特定位置插入一个新元素
   * @param {any} element 新元素
   * @param {Number} index 指定位置
   */
  insert (element, index) {
    if (index >= 0 && index < this.count) {
      const node = new Node(element)
      if (index === 0) {
        // 在第一个位置添加
        const current = this.head
        node.next = current
        this.head = node
      } else {
        const previous = this.getElementAt(index - 1)
        const current = previous.next
        node.next = current
        previous.next = node
      }
      this.count++
      return true
    }
    return false
  }
  /**
   * 返回链表中特定位置的元素
   * 如果链表中不存在这样的元素，则返回 undefined
   * @param {Number} index 位置索引
   */
  getElementAt (index) {
    if (index >= 0 && index < this.count) {
      let node = this.head
      for (let i = 0; i < index && node != null; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }
  /**
   * 返回元素在链表中的索引
   * 如果链表中没有该元素则返回 -1
   * @param {any} element 要查找的元素
   */
  indexOf (element) {
    let current = this.head
    for (let i = 0; i < this.count && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }
  /**
   * 从链表的特定位置移除一个元素
   * @param {Number} index 指定索引
   */
  removeAt (index) {
    // 检查越界值
    if (index >= 0 && index < this.count) {
      let current = this.head

      if (index === 0) {
        // 移除第一项
        this.head = current.next
      } else {
        // // 要移除节点的前一个节点的引用
        // let previous
        // for (let i = 0; i < index; i++) {
        //   previous = current
        //   current = current.next
        // }
        // // 将 previous 与 current 的下一项连接起来，跳过 current，从而移除它
        // previous.next = current.next
        const previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = current.next
      }
      this.count--
      // current 要移除节点的引用
      return current.element
    }
    return undefined
  }
  /**
   * 如果链表中不包含任何元素，返回 true
   * 如果链表长度大于 0 则返回 false
   */
  isEmpty () {
    return this.size() === 0
  }
  /**
   * 返回链表包含的元素个数，与数组的 length 属性类似
   */
  size () {
    return this.count
  }
  /**
   * 获取链表头部
   */
  getHead () {
    return this.head
  }
  /**
   * 返回表示整个链表的字符串
   */
  toString () {
    if (this.head === null) {
      // 如果链表为空，返回 ''
      return ''
    }
    // 用链表的第一个元素值来初始化
    let objString = `${this.head.element}`
    let current = this.head.next
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`
      current = current.next
    }
    return objString
  }
}

/**
 * 双向链表
 * 双向链表和普通链表的区别在于，在链表中，一个节点只有链向下一个节点的链接
 * 在双向链表中，链接是双向的，一个链向下一个元素，另一个链向前一个元素
 * 双向链表提供了两种迭代的方法:从头到尾，或者从尾到头
 * 我们也可以访问一个特定的节点的下一个或前一个元素
 *
 * !: 在单向链表中，如果迭代时错过了要找的元素，就需要回到起点，重新开始迭代。这是双向链表的一个优势
 */

class DoublyNode extends Node {
  constructor (element, next, prev) {
    super(element, next)
    this.prev = prev
  }
}

class DoublyLinkedList extends LinkedList {
  constructor (equalsFn = defaultEquals) {
    super(equalsFn)
    // 保存对链表最后一个元素的引用
    this.tail = undefined
  }
  /**
   * 插入一个新元素
   * 双向链表需要同时控制 next 和 prev 这两个指针
   * @param {*} element 
   * @param {*} index 
   */
  insert (element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element)
      let current = this.head

      if (index === 0) {
        if (this.head == null) {
          this.head = node
          this.tail = node
        } else {
          node.next = this.head
          current.prev = node
          this.head = node
        }
      } else if (index === this.count) {
        // 最后一项
        current = this.tail
        current.next = node
        node.prev = current
        this.tail = node
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous.next
        node.next = current
        previous.next = node
        current.prev = node
        node.prev = previous
      }
      this.count++
      return true
    }
    return false
  }
  /**
   * 从任意位置移除元素
   * 还需要设置前一个位置的指针
   * @param {*} index 某一位置索引
   */
  removeAt (index) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      if (index === 0) {
        this.head = current.next
        // 如果只有一项，更新 tail
        if (this.count === 1) {
          this.tail = undefined
        } else {
          this.head.prev = undefined
        }
      } else if (index === this.count - 1) {
        // 最后一项
        current = this.tail
        this.tail = current.prev
        this.tail.next = undefined
      } else {
        current = this.getElementAt(index)
        const previous = current.prev
        // 将 previous 与 current 的下一项连接起来 跳过 current
        previous.next = current.next
        current.next.prev = previous
      }
      this.count--
      return current.element
    }
    return undefined
  }
}

module.exports = { LinkedList, DoublyLinkedList }
