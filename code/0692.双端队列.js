/*
 * @Author: Lambda
 * @Begin: 2020-04-05 20:09:44
 * @Update: 2020-04-06 14:53:41
 * @Update log: 更新日志
 */

/**
 * 双端队列：是一种允许我们同时从前端和后端添加和移除元素的特殊队列
 *
 * TODO: 双端队列在现实生活中的例子有电影院，餐厅中排队的队伍等
 * 一个刚买完票的人如果只是还需要再询问一些简单的信息，就可以直接回到队伍的头部，另外，队伍尾部的人如果赶时间，他可以直接离开队伍
 *
 * *: 双端队列的一个常见应用是存储一系列的撤销操作
 * 由于双端队列同时遵守了先进先出和后进后出原则，可以说它是把队列和栈结合的一种数据结构
 */

/**
 * 创建 Deque 类
 */
class Deque {
  constructor () {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }
  /**
   * 在双端队列前端添加新的元素
   * @param {*} element 新元素
   */
  addFront (element) {
    if (this.isEmpty()) {
      // 如果这个双端队列是空的话，执行 addBack 方法，会被添加到队列后端
      this.addBack(element)
    } else if (this.lowestCount > 0) {
      // 一个元素已经被从双端队列的前端移除
      this.lowestCount--
      // 属性-- 并将元素放到这个键上即可
      this.items[this.lowestCount] = element
    } else {
      // 把所有元素都后移一位来空出来第一个位置
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1]
      }
      // 在所有的元素都完成移动后，第一位将是空闲状态，这样就可以用需要添加的新元素来覆盖它
      this.count++
      this.lowestCount = 0
      this.items[0] = element
    }
  }
  /**
   * 该方法在双端队列后端添加新的元素
   * @param {*} element 新元素
   */
  addBack (element) {
    this.items[this.count] = element
    this.count++
  }
  /**
   * 该方法会从双端队列前端移除第一个元素
   */
  removeFront () {
    if (this.isEmpty()) {
      return undefined
    }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }
  /**
   * 该方法会从双端队列后端移除第一个元素
   */
  removeBack () {
    if (this.isEmpty()) {
      return undefined
    }
    const result = this.items[this.count]
    delete this.items[this.count]
    this.count--
    return result
  }
  /**
   * 该方法返回双端队列前端的第一个元素
   */
  peekFront () {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }
  /**
   * 该方法返回输给你段队列后端的第一个元素
   */
  peekBack () {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.count]
  }
  isEmpty () {
    return this.count - this.lowestCount === 0
  }
  clear () {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }
  size () {
    return this.count - this.lowestCount
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

const deque = new Deque()
deque.addFront('Lambda')
deque.addBack('LambdaBack')
deque.addFront('LHD')
console.log(deque.toString()) // Lambda,LHD,LambdaBack

deque.addBack('powerdong')
console.log(deque.toString()) // Lambda,LHD,LambdaBack,powerdong
console.log(deque.size()) // 4
deque.peekFront() // 输出 Lambda
deque.peekBack() // 移除 powerdong
deque.removeBack() // 移除 powerdong
deque.peekBack() // 输出 LambdaBack
console.log(deque.toString()) // LHD, Lambda, LambdaBack

module.exports = Deque
