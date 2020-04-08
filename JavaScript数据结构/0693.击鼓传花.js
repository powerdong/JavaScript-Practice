/*
 * @Author: Lambda
 * @Begin: 2020-04-06 14:36:59
 * @Update: 2020-04-06 14:49:31
 * @Update log: 更新日志
 */

/**
 * 循环队列
 * 循环队列的一个来自就是击鼓传花游戏
 * 在这个游戏中，孩子们围成一个圈，把花尽快的传递给旁边的人。某一时刻传花停止，这个时候花在谁手里，谁就退出圆圈、结束游戏
 * 重复这个过程，直到只剩一个孩子(胜者)
 */

const Queue = require('./0691.队列')

/**
 * 实现击鼓传花游戏
 * @param {*} elementsList 名单
 * @param {*} num 迭代几个
 */
function hotPotato (elementsList, num) {
  const queue = new Queue()
  const eliminatedList = []

  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i])
  }

  while (queue.size() > 1) {
    // 给定一个数字，然后迭代队列
    for (let i = 0; i < num; i++) {
      // 队列开头移除一项，再将其加入到队列末尾
      queue.enqueue(queue.dequeue())
    }
    // 一旦达到给定的传递次数，拿着花的那个人就被淘汰了
    eliminatedList.push(queue.dequeue())
  }

  return {
    eliminated: elementsList,
    // 最后只剩下一人，就是胜者
    winner: queue.dequeue()
  }
}

const names = ['John', 'Jack', 'Camilla', 'Lambda']
const result = hotPotato(names, 3)
console.log(result)
