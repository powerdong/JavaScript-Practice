/**
 * 要理解递归，首先要理解递归       ---佚名
 */

/**
 * 递归函数是像下面这样能够直接调用自身的方法或函数
 * 每个递归函数都必须有基线条件，即一个不再递归调用的条件(停止点)，以防止无限递归
 */
function recursiveFunction(someParam) {
  recursiveFunction(someParam)
}

// 数 n 的阶乘，定义为 n!，表示从 1 到 n 的整数的乘积


/**
 * 使用循环来写一个计算一个数阶乘的函数
 * @param {Number} number 任意数
 */
function factorialIterative(number) {
  if (number < 0) return undefined
  let total = 1;
  for (let n = number; n > 1; n--) {
    total = total * n;
  }
  return total
}

console.log('factorialIterative(5): ', factorialIterative(5)); // 120


/**
 * 递归阶乘
 * *: 每当一个函数被一个算法调用时，该函数会进入调用栈的顶部。当使用递归的时候，每个函数调用都会堆叠在调用栈的顶部，
 * *: 这是因为每个调用都可能依赖前一个调用的结果。
 * @param {Number} n 任意数 n
 */
function factorial(n) {
  if (n === 1 || n === 0) {
    // 基线条件
    return 1;
  }
  // 递归调用
  return n * factorial(n - 1)
}

console.log('factorial(5): ', factorial(5)); // 120

// JavaScript 调用栈大小的限制
/**
 * 如果忘记加上用以停止函数递归调用的基线条件，递归并不会无限地执行下去，浏览器会抛出错误，也就是所谓的栈溢出错误。
 * RangeError: Maximum call stack size exceeded
 */

/**
 * !: ECMAScript 2015 有尾调用优化。如果函数内的最后一个操作是调用函数，而不是”子程序调用“来控制
 */

// 斐波那契数列
/**
 * 斐波那契数列 是另一个可以用递归解决的问题。
 * *: 位置 0 的斐波那契数是零
 * *: 1 和 2 的斐波那契数是 1
 * *: n (此处 n > 2) 的斐波那契数是 (n - 1) 的斐波那契数加上 (n - 2) 的斐波那契数
 */

/**
 * 迭代的方法实现 fibonacci 函数
 * @param {Number} n 任意数 n
 */
function fibonacciIterative(n) {
  if (n < 1) return 0
  if (n <= 2) return 1

  let fibNMinus2 = 0
  let fibNMinus1 = 1
  let fibN = n
  for (let i = 2; i <= n; i++) { // n >= 2
    fibN = fibNMinus1 + fibNMinus2 // f(n -1) + f(n -2)
    fibNMinus2 = fibNMinus1
    fibNMinus1 = fibN
  }
  return fibN
}

/**
 * 递归的方法求斐波那契数
 * @param {Number} n 任意数 n
 */
function fibonacci(n) {
  if (n < 1) return 0
  if (n <= 2) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}

/**
 * 记忆化斐波那契数列，记忆化是一种保存前一个结果的值的优化技术，类似于缓存
 * 声明一个 memo 数组来缓存所有的计算结果，如果结果已经被计算了，我们就返回它，否则计算该结果并将它加入缓存
 * @param {Number} n 任意数 n
 */
function fibonacciMemorization(n) {
  const memo = [0 ,1]
  const fibonacci = (n) => {
    if (memo[0] != null) return memo[n]
    return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
  }
  return fibonacci
}

/**
 * !: 迭代的版本比递归的版本快很多，所以这表示递归更慢
 * 递归版本更容易理解，需要的代码通常也更少。
 * 对一些算法来说，迭代的解法可能不可用，而且有了尾调用优化，递归的多与消耗甚至可能被消除
 */