/*
 * @Author: Lambda
 * @Begin: 2020-04-05 19:41:53
 * @Update: 2020-04-06 14:52:18
 * @Update log: 更新日志
 */

/**
 * 队列是遵循先进先出 FIFO，也称为先来先服务原则的一组有序的项。
 * 队列在尾部添加新元素，并从顶部移除元素
 * 最新添加的元素必须排在队列的末尾
 * *: 最常见的队列的例子就是排队
 *
 * TODO: 在电影院、自助餐厅、杂货店收银台，我们都会排队。排在第一位的人会先接受服务
 */

/**
 * 队列
 */
class Queue {
  constructor () {
    // 声明 count 属性来帮助我们控制队列的大小
    this.count = 0
    // 由于我们将要从队列前端移除元素，同样需要一个变量来帮助我们追踪第一个元素
    this.lowestCount = 0
    this.items = {}
  }
  /**
   * 襄队列尾部添加一个(或多个)新的项
   * @param {*} element 新的项
   * !: 只能添加到队列末尾
   */
  enqueue (element) {
    this.items[this.count] = element
    this.count++
  }
  /**
   * 移除队列的第一项，并返回被移除的元素
   * TODO: 队列遵循先进先出的原则，最先添加的项也是最先被移除的
   */
  dequeue () {
    if (this.isEmpty()) {
      // 判断队列是否为空，如果空，我们返回 undefined
      return undefined
    }
    // 暂存队列头部的值
    const result = this.items[this.lowestCount]
    // 移除该项
    delete this.items[this.lowestCount]
    // 将 lowestCount 属性加 1
    this.lowestCount++
    return result
  }
  /**
   * 返回队列中的第一个元素——最先被添加，也将是最先被移除的元素
   * 队列不做任何变动
   */
  peek () {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }
  /**
   * 如果队列中不包含任何元素，返回 true，否则返回 false
   */
  isEmpty () {
    // 要计算队列中有多少元素，只需要计算 count 和 lowestCount 之间的差值即可
    // TODO: 假设 count 属性值为 2，lowestCount 的值为 0，这表示在队列中有两个元素
    return this.count - this.lowestCount === 0
    // return this.size() === 0
  }
  /**
   * 返回队列包含的元素个数，与数组的 length 属性类似
   */
  size () {
    return this.count - this.lowestCount
  }
  /**
   * 清空队列的所有元素
   */
  clear () {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }
  toString () {
    if (this.isEmpty()) {
      return ''
    }
    let objString = `${this.items[this.lowestCount]}`
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }
}

const queue = new Queue()
console.log(queue.isEmpty()) // true

queue.enqueue('Lambda')
queue.enqueue('LHD')
console.log(queue.toString()) // Lambda,LHD

queue.enqueue('powerdong')
console.log(queue.toString()) // Lambda,LHD,powerdong
console.log(queue.size()) // 3
queue.dequeue() // 移除 Lambda
queue.dequeue() // 移除 LHD
console.log(queue.toString()) // powerdong

module.exports = { Queue }
