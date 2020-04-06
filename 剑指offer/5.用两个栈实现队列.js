/*
 * @Author: Lambda
 * @Begin: 2020-04-06 16:46:01
 * @Update: 2020-04-06 16:55:35
 * @Update log: 更新日志
 */

/**
 * 用两个栈实现队列
 * 用两个栈实现一个队列，队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead
 * 分别完成在队列尾部插入结点和在对队列头部删除结点的功能
 */

const outStack = []
const inStack = []

/**
 * 在队列尾部插入结点
 * @param {*} node 结点
 */
function appendTail (node) {
  inStack.push(node)
}

/**
 * 在队列头部删除结点
 */
function deleteHead () {
  // 如果当前出栈元素为空
  if (!outStack.length) {
    while (inStack.length) {
      // 先将入栈的元素依次填入到出栈元素中
      outStack.push(inStack.pop())
    }
  }
  // 删除头部结点
  return outStack.pop()
}

appendTail(1)
console.log(inStack)
appendTail(2)
console.log(inStack)
appendTail(3)
console.log(inStack)
appendTail(4)
console.log(inStack)

console.log('deleteHead(): ', deleteHead())
console.log('deleteHead(): ', deleteHead())
console.log('deleteHead(): ', deleteHead())
