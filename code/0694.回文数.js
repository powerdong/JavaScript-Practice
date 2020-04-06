/*
 * @Author: Lambda
 * @Begin: 2020-04-06 14:52:53
 * @Update: 2020-04-06 15:04:00
 * @Update log: 更新日志
 */

/**
 * 回文数：回文是正反都能读懂的单词、词组、数或者一系列字符的序列
 * 有不同的算法可以检查一个词组或字符串是否为回文。
 * 最简单的方式就是将字符串反向排列并检查它和原字符串是否相同
 * 如果两者相同，那么它就是一个回文数
 */

const Deque = require('./0692.双端队列')

/**
 * 判断是否是回文数
 * @param {String} aString 字符串
 */
function palindromeChecker (aString) {
  if (aString === undefined || aString === null || (aString !== null && aString.length === 0)) {
    // 检查传入的字符串参数是否合法
    return false
  }
  const deque = new Deque()
  // 将所有的字母转换为小写，同时移除所有的空格
  const lowerString = aString.toLocaleLowerCase().split(' ').join('')
  let isEqual = true
  let firstChar, lastChar

  for (let i = 0; i < lowerString.length; i++) {
    // 对字符串中所有的字符执行 enqueue 操作
    deque.addBack(lowerString.charAt(i))
  }

  // 如果所有元素都在队列中，并且首位字符相同的话
  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront()
    lastChar = deque.removeBack()
    if (firstChar !== lastChar) {
      isEqual = false
    }
  }

  return isEqual
}

palindromeChecker('a')
palindromeChecker('ada')
