/*
 * @Author: Lambda
 * @Begin: 2020-04-06 17:49:06
 * @Update: 2020-04-06 18:09:16
 * @Update log: 更新日志
 */

/**
 * 斐波那契数列
 * 写一个函数，输入n，求斐波那契数列的第 n 项
 * @param {*} n 求斐波那契数列的第 n 项
 */
function Fibonacci (n) {
  if (n <= 0) return 0
  if (n === 1) return 1
  return Fibonacci(n - 1) + Fibonacci(n - 2)
}

function FibonacciPlus (n) {
  let resultArr = [0, 1]
  if (n < 2) {
    return resultArr[n]
  }
  let fibNMinusOne = 1
  let fibNMinusTwo = 0
  let fibN = 0
  for (let i = 2; i <= n; i++) {
    fibN = fibNMinusOne + fibNMinusTwo

    fibNMinusTwo = fibNMinusOne
    fibNMinusOne = fibN
  }
  return fibN
}

console.log('Fibonacci(20): ', Fibonacci(20))
console.log('FibonacciPlus(20): ', FibonacciPlus(20))
