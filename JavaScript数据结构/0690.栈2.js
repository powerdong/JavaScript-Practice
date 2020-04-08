/*
 * @Author: Lambda
 * @Begin: 2020-04-05 17:37:34
 * @Update: 2020-04-05 19:29:42
 * @Update log: 更新日志
 */

/**
 * 使用数组时，大部分方法的时间复杂度是 O(n)
 * O(n) 的意思是，我们需要迭代整个数组直到找到要找的那个元素，在最坏的情况下需要迭代数组的所有位置
 * 其中 n 代表数组的长度。如果数组有更多元素的情况下，所需的时间会更长。
 * 另外，数组是元素的一个有序集合，为了保证元素排列有序，它会占用更多的内存空间
 */

/**
 * 使用一个 count 属性来帮助我们记录栈的大小
 */
class StackPlus {
  constructor () {
    this.count = 0
    this.items = {}
  }
  /**
   * 向栈中插入元素
   * 由于现在使用了一个对象，这个版本的 push 只允许我们一次插入一个元素
   * 在 JavaScript 中，对象是一系列键值对的集合
   * 要向栈中添加元素，我们将使用 count 变量作为 items 对象的键名，插入的元素则是它的值
   * 在向栈插入元素后，我们递增 count 变量
   */
  push (element) {
    this.items[this.count] = element
    this.count++
  }
  /**
   * 获取栈的大小
   * count 表示栈的大小，因此，我们只需简单的返回 count 值来实现 size 功能
   */
  size () {
    return this.count
  }
  /**
   * 验证栈是否为空
   */
  isEmpty () {
    return this.count === 0
  }
  /**
   * 弹出元素
   * 返回了从栈中移除的元素
   */
  pop () {
    // 校验栈是否为空
    if (this.isEmpty()) {
      // 如果为空，返回undefined
      return undefined
    }
    // count属性减 1
    this.count--
    // 保存栈顶的值
    const result = this.items[this.count]
    // 删除栈顶元素
    delete this.items[this.count]
    // 返回栈顶元素
    return result
  }
  /**
   * 查看栈顶元素
   */
  peek () {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.count - 1]
  }
  /**
   * 清空栈
   * 复原为构造函数中使用的值
   */
  clear () {
    this.items = {}
    this.count = 0
    // =======
    // while (!this.isEmpty()) {
    //   this.pop()
    // }
  }
  /**
   * 打印栈的内容
   */
  toString () {
    // 如果栈是空，只需返回一个空字符串
    if (this.isEmpty()) {
      return ''
    }
    // 用它底部的第一个元素作为字符串的初始值
    let objString = `${this.items[0]}`
    // 迭代整个栈的键，知道栈顶，添加一个逗号，以及下一个元素
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }
}

const stackPlus = new StackPlus()
console.log(stackPlus.isEmpty())

stackPlus.push(5)
stackPlus.push(8)

console.log('stackPlus.peek()', stackPlus.peek()) // 8

stackPlus.push(11)
console.log(stackPlus.size()) // 3
console.log(stackPlus.isEmpty()) // false

stackPlus.push(15)

stackPlus.pop()
stackPlus.pop()
console.log(stackPlus.size()) // 2

/**
 * 十进制转换为二~三十六进制
 * 我们可以将十进制除以 2 并对商取整，直到结果为 0 为止
 * 10 / 2 == 5   rem == 0
 * 5 / 2 == 2   rem == 1
 * 2 / 2 == 1   rem == 0
 * 1 / 2 == 0   rem == 1
 * 输出 1010
 * @param {Number} decNumber 十进制数
 * @param {Number} base 要转换为目标进制的基数
 */
function decimalToBinary (decNumber, base) {
  const remStack = new StackPlus()
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let number = decNumber
  let rem
  let binaryString = ''

  if (!(base >= 2 && base <= 36)) {
    return ''
  }

  while (number > 0) {
    // 当除法的结果不为 0 时，我们会获得一个余数
    rem = Math.floor(number % base)
    // 并放入栈中
    remStack.push(rem)
    // 然后除以 2,需要使用 floor 使得返回数仅返回整数部分
    number = Math.floor(number / base)
  }

  while (!remStack.isEmpty()) {
    // 使用 pop 方法把栈中的元素都移除，把出栈的元素连接成字符串
    binaryString += digits[remStack.pop()]
  }

  return binaryString
}

console.log('decimalToBinary(233, 2): ', decimalToBinary(233, 2))
console.log('decimalToBinary(1563, 16): ', decimalToBinary(1563, 16))
