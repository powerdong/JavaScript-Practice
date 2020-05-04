/*
 * @Author: Lambda
 * @Begin: 2020-04-05 17:08:17
 * @Update: 2020-04-05 17:52:49
 * @Update log: 更新日志
 */
/**
 * 栈是一种遵从后进先出原则的有序集合。
 * 新添加或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底
 * 栈也被用在编程语言的编译器和内存中保存变量、方法调用等，也被用于浏览器历史记录
 */
class Stack {
  constructor () {
    // 数组允许我们在任何位置添加或删除元素，由于栈遵从LIFO原则，需要对元素的插入和删除功能进行限制
    /** @type {any[]} */
    this.items = []
  }
  /**
   * 添加一个(或几个)新元素到栈顶
   * @param {any} element 新元素
   */
  push (element) {
    this.items.push(element)
  }
  /**
   * 移出栈顶的元素，同时返回被移除的元素
   */
  pop () {
    return this.items.pop()
  }
  /**
   * 返回栈顶的元素，不对栈做任何修改(该方法不会移出栈顶的元素，仅仅返回他)
   */
  peek () {
    return this.items[this.items.length - 1]
  }
  /**
   * 如果栈里没有任何元素就返回 true， 否则返回 false
   */
  isEmpty () {
    return this.items.length === 0
  }
  /**
   * 移出栈里的所有元素
   */
  clear () {
    this.items = []
  }
  /**
   * 返回栈里的元素个数，该方法和数组中的 length 属性很类似
   */
  size () {
    return this.items.length
  }
}

const stack = new Stack()
console.log(stack.isEmpty())

stack.push(5)
stack.push(8)

console.log('stack.peek()', stack.peek()) // 8

stack.push(11)
console.log(stack.size()) // 3
console.log(stack.isEmpty()) // false

stack.push(15)

stack.pop()
stack.pop()
console.log(stack.size()) // 2

module.exports = {
  Stack
}