/* eslint-disable no-unused-vars */
/**
 * 链表的基本特征：
 * 每个元素除了存储数据，需要有额外的内存存储一个引用(地址)，来指向下一个元素
 * 每个元素占用的内存空间并不要求是连续的
 * 往往使用链表的第一个节点(根节点)来代表整个链表
 */

/**
 * 链表的特点
 * 1. 长度是可变的，随时可以增加和删除元素
 * 2. 插入和删除元素的效率极高
 * 3. 由于要存储下一个元素的地址，会增加额外的内存开销
 * 4. 通过下标查询链表的中的某个节点，效率很低，因此链表的下标遍历效率低
 */

class Node {
  // 创建一个节点
  constructor (value) {
    this.value = value
    this.next = null
  }
  /**
   * 遍历打印链表
   * @param {*} root 链表根节点
   */
  print (root) {
    if (root) {
      // 打印当前节点的value
      console.log(root.value)
      // 打印下一个节点
      this.print(root.next)
    }
  }
  /**
   * 获取链表的长度
   * @param {*} root 链表根节点
   */
  getLength (root) {
    if (!root) {
      return 0
    }
    return 1 + this.getLength(root.next)
  }
  /**
   * 通过下标获取链表中的某个值
   * @param {*} root 根节点
   * @param {*} index 索引下标
   */
  getValue (root, index) {
    // 判断给定的 node 和对应的下标是不是满足要求
    function _getValue (node, curIndex) {
      if (curIndex === index) {
        return node
      }
      if (!node) {
        // 已经超出链表的范围
        return false
      }
      return _getValue(node.next, curIndex + 1)
    }
    return _getValue(root, 0)
  }
  /**
   * 修改链表中某个值
   * @param {*} root 链表
   * @param {*} index 索引
   * @param {*} value 新值
   */
  setValue (root, index, value) {
    function _setValue (node, curIndex) {
      if (!node) {
        // 节点不存在
        return false
      }
      if (index === curIndex) {
        node.value = value
        return true
      }
      _setValue(node.next, curIndex + 1)
    }
    _setValue(root, 0)
  }
  /**
   * 向链表中新插入一个元素
   * @param {*} root 根节点
   * @param {*} index 插入位置
   * @param {*} newValue 插入值
   */
  insert (root, index, newValue) {
    function _insert (node, curIndex) {
      if (!node) {
        return false
      }
      // 当前索引是目标索引之前的一位
      if (curIndex === index - 1) {
        const newNode = new Node(newValue)
        newNode.next = node.next
        node.next = newNode
        return true
      }
      _insert(node.next, curIndex + 1)
    }
    return _insert(root, 0)
  }
  /**
   * 在链表末位添加一个新节点
   * @param {*} root 根节点
   * @param {*} newValue 新数
   */
  append (root, newValue) {
    function _append (node) {
      if (!node) {
        return false
      }
      if (!node.next) {
        const newNode = new Node(newValue)
        node.next = newNode
        return node
      }
      _append(node.next)
    }
    _append(root)
    return root
  }
  /**
   * 删除一个链表节点
   * @param {*} root 链表根节点
   * @param {*} index 索引
   */
  remove (root, index) {
    function _remove (node, curIndex) {
      if (!node || !node.next) {
        return false
      }
      if (curIndex === index - 1) {
        node.next = node.next.next
        return true
      }
      _remove(node.next, curIndex + 1)
    }
    _remove(root, 0)
  }
  /**
   * 链表倒序
   * @param {*} root 链表根节点
   */
  reverse (root) {
    if (!root || !node.next) {
      // 没有节点 || 只有一个
      return root
    }
    if (!root.next.next) {
      // 两个节点
      const tmp = root.next
      tmp.next = root
      root.next = null
      return tmp
    }
    // 先把后边的两两进行颠倒
    const tmp = this.reverse(root.next)
    // 对根节点再进行单独的操作
    root.next.next = root
    root.next = null
    return tmp
  }
}

let node = new Node(5)
let node1 = new Node(3)
node.next = node1
let node2 = new Node(7)
node1.next = node2
console.log('node: Print', node.print(node))
console.log('node: Len', node.getLength(node))
console.log('node: append', node.append(node, 111))
console.log('node: reverse', node.reverse(node))
