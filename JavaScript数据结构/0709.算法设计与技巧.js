/*
 * @Author lihaodong
 * @Date 2020/05/06
 * @TODO TODO
 */
/**
 * 分而治之
 * 分而治之是算法设计中的一种方法。它将一个问题分成多个和原问题相似的小问题，递归解决小问题再将解决方式合并以解决原来的问题
 * 
 * 1. 分解原问题为多个子问题(原问题的多个小实例)
 * 2. 解决子问题，用返回解决子问题的方式的递归算法。死鬼算法的基本情形可以用来解决子问题
 * 3. 组合这些子问题的解决方式，得到原问题的解
 */

/**
 * 动态规划
 * 动态规划是一种将复杂问题分解成更小的子问题来解决的优化技术
 * 分而治之方法是把问题分解成相互独立的子问题，然后组合他们的答案，而动态规划则是将问题分解成相互以来的子问题
 * 
 * 1. 定义子问题
 * 2. 实现要反复执行来解决子问题的部分
 * 3. 识别并求解出基线条件
 * 
 * 可以解决的一些问题
 * 1. 背包问题：给出一组项，各自有值和容量，目标是找出总值最大的项的集合。
 *    这个问题的限制是，总容量必须小于等于 "背包" 的容量
 * 2. 最长公共子序列：找出一组序列的最长公共子序列(可由另一序列删除元素但不改变余下元素的顺序而得到)
 * 3. 矩阵链相乘：给出一系列矩阵，目标是找到这些矩阵相乘的最高效办法(计算次数尽可能少)
 *    相乘运算不会进行，解决方案是找到这些矩阵各自相乘的顺序
 * 4. 硬币找零：给出面额为 d1,...dn 的一定数量的硬币和要找零的钱数，找出有多少种找零的方法
 * 5. 图的全源最短路径：对所有顶点对(u,v)，找出从顶点 u 到顶点 v 的最短路径
 */

/**
 * 最少硬币找零问题
 * @param {Array} coins 零钱面额
 * @param {Number} amount 总数
 */
const minCoinChange = (coins, amount) => {
  // 记忆化
  const cache = []
  const makeChange = (value) => {
    // 若值的格式不规范，就返回空数组
    if (!value) {
      return []
    }
    // 如果有缓存，直接获取缓存的值
    if (cache[value]) {
      return cache[value]
    }
    let min = []
    let newMin
    let newAmount
    // 对于每个面额
    for (let i = 0; i < coins.length; i++) {
      // 我们都计算 newAmount 的值
      const coin = coins[i];
      // 它的值会一直减小，直到找到能找零的最小钱数
      newAmount = value - coin
      if (newAmount >= 0) {
        newMin = makeChange(newAmount)
      }
      // 我们判断 newAmount 是否有效，minValue 是否是最优解，与此同时 minValue 和 newAmount 是否是合理的值
      if (newAmount >= 0 && (newMin.length < min.length - 1 || !min.length) && (newMin.length || !newAmount)) {
        min = [coin].concat(newMin)
      }
    }
    return (cache[value] = min)
  }
  return makeChange(amount)
}

console.log('minCoinChange([1,5,10,25], 36): ', minCoinChange([1,5,10,25], 36));

/**
 * 背包问题是一个组合优化的问题
 * 给定一个固定大小、能够携重量 W 的背包，以及一组有价值和重量的物品，找出一个最佳解决方案，使得装入背包的物品总重量不超过 W，且总价值最大
 * @param {Number} capacity 固定大小
 * @param {Array} weights 能够携带重量 W 的背包
 * @param {Array} values 有价值和重量的物品
 * @param {Number} n 物品数
 */
const knapSack = (capacity, weights, values,n) => {
  const kS = []
  // 初始化用于寻找解决方案的矩阵
  for (let i = 0; i <= n; i++) {
    kS[i] = []
  }

  for (let i = 0; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (i === 0 || w === 0) {
        // 忽略矩阵的第一列和第一行，只处理索引不为 0 的列和行
        kS[i][w] = 0
      } else if (weights[i - 1] <= w) {
        // 物品 i 的重量必须小于约束才有可能成为解决方案的一部分，否则总重量就会超出背包能够携带的重量
        const a = values[i - 1] + kS[i - 1][w - weights[i - 1]]
        const b = kS[i - 1][w]
        // 当找到可以构成解决方案的物品时，选择价值最大的那个
        kS[i][w] = a > b ? a : b
      } else {
        // 用之前的值
        kS[i][w] = kS[i - 1][w]
      }
    }
  }
  // 找出构成解决方案的物品
  findValues(n, capacity, kS, weights, values)
  // 最后，问题的解决方案就在二维表格右下角最后的格子里
  return kS[n][capacity]
}

const findValues = (n, capacity, kS, weights, values) => {
  let i = n
  let k = capacity
  console.log(`构成解的物品: `);
  while (i > 0 && k > 0) {
    if (kS[i][k] !== kS[i - 1][k]) {
      console.log(`物品 ${i} 可以是解的一部分w，v: ${weights[i - 1]}, ${values[i - 1]}`);
      i--
      k -= kS[i][k]
    } else {
      i--
    }
  }
}

const values = [3,4,5]
weights = [2,3,4]
capacity = 5
n = values.length
console.log('knapSack(capacity,weights, values, n): ', knapSack(capacity,weights, values, n));


/**
 * 最长公共子序列
 * 找出两个字符串序列的最长子序列的长度
 * 最长子序列是指，在两个字符串序列中以相同顺序出现，但不要求连续的字符串序列
 * @param {String} wordX 一个子序列
 * @param {String} wordY 另一个子序列
 */
const lcs = (wordX, wordY) => {
  const m = wordX.length
  const n = wordY.length
  const l = []
  const solution = []
  // 初始化
  for (let i = 0; i <= m; i++) {
    l[i] = []
    solution[i] = []
    for (let j = 0; j <= n; j++) {
      l[i][j] = 0
    }
  }
  
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        l[i][j] = 0
        solution[i][j] = '0'
      } else if (wordX[i - 1] === wordY[j - 1]) {
        l[i][j] = l[i - 1][j - 1] + 1
        solution[i][j] = 'diagonal'
      } else {
        const a = l[i - 1][j]
        const b = l[i][j - 1]
        l[i][j] = a > b ? a : b
        solution[i][j] = (l[i][j] == l[i - 1][j]) ? 'top' : 'left'
      }
    }
  }
  printSolution(solution, wordX, m, n)
  return l[m][n]
}

const printSolution = (solution, wordX, m, n) => {
  let a = m
  let b = n
  let x = solution[a][b]
  let answer = ''
  while (x !== '0') {
    if (solution[a][b] === 'diagonal') {
      answer = wordX[a - 1] + answer
      a--
      b--
    } else if (solution[a][b] === 'left') {
      b--
    } else if (solution[a][b] === 'top') {
      a--
    }
    x = solution[a][b]
  }
  console.log(`lcs: ${answer}`);
}

console.log("lcs('abckds', 'abcdefg'): ", lcs('abckds', 'abcdefg'));

/**
 * 矩阵链相乘
 * 找出一组矩阵相乘的最佳方式
 * @param {Array} p 待求的数组
 */
const matrixChainOrder = (p) => {
  const n = p.length
  const m = []
  const s = []

  for (let i = 0; i <= n; i++) {
    s[i] = []
    for (let j = 0; j <= n; j++) {
      s[i][j] = 0
    }
  }

  for (let i = 1; i <= n; i++) {
    m[i] = []
    m[i][i] = 0
  }

  for (let l = 2; l < n; l++) {
    for (let i = 1; i <= (n - l) + 1; i++) {
      const j = (i + l) - 1
      m[i][j] = Number.MAX_SAFE_INTEGER
      for (let k = i; k <= j - 1; k++) {
        const q = m[i][k] + m[k + 1][j] + ((p[i - 1] * p[k]) * p[j])
        if (q < m[i][j]) {
          m[i][j] = q
          s[i][j] = k
        }
      }
    }
  }
  printOptimalParenthesis(s, 1, n - 1)
  return m[1][n - 1]
}

const printOptimalParenthesis = (s, i, j) => {
  if (i === j) {
    return(`A[${i}]`);
  } else {
    console.log(`(
      ${printOptimalParenthesis(s, i, s[i][j])}
      ${printOptimalParenthesis(s, s[i][j] + 1, j)}
    )`);
    
  }
}

const p = [10, 100, 5, 50, 1]
console.log('matrixChainOrder(p): ', matrixChainOrder(p));

/**
 * 贪心算法
 * 贪心算法遵循一种近似解决问题的技术，期盼通过每个阶段的局部最优解(当前最好的解)，从而达到全局的最优(全局最优解)
 */

/**
 * 最少硬币找零问题
 * 比起动态规划算法而言，贪心算法更简单、更快。然而，它并不总是得到最有答案。
 * 但是综合来看，它相对执行时间来说，输出了一个可以接受的解
 * @param {Array} coins 硬币面额
 * @param {Number} amount 需要找多少钱
 */
const minCoinChangeGreedy = (coins, amount) => {
  const change = []
  let total = 0
  for (let i = coins.length; i >= 0; i--) {
    const coin = coins[i]
    while (total + coin <= amount) {
      change.push(coin)
      total += coin
    }
  }
  return change
}

console.log('minCoinChangeGreedy([1,5,10,25], 36): ', minCoinChangeGreedy([1,5,10,25], 36));

const knapSackGreedy = (capacity, weights, values) => {
  const n = values.length
  let load = 0
  let val = 0
  // 总重量少于背包容量，我们会迭代物品
  for (let i = 0; i < n && capacity; i++) {
    // 如果物品可以完整地装入背包，就将其价值和重量分别计入背包已装入物品的总价值
    if (weights[i] <= capacity - load) {
      val += values[i]
      load += weights[i]
    } else {
      // 如果物品不能完整地装入背包，计算能够装入部分的比例
      const r = (capacity - load) / weights[i]
      val += r * values[i]
      load += weights[i]
    }
  }
  return val
}

console.log('knapSackGreedy(capacity, weights, values): ', knapSackGreedy(capacity, weights, values));

/**
 * 回溯算法
 * 回溯是一种渐进式寻找并构建问题解决方式的策略
 * 我们从一个可能的动作开始并试着用这个动作解决问题。如果不能解决，就回溯并选择另一个动作直到将问题解决
 * 根据这种行为，回溯算法会尝试所有可能的动作来解决问题
 */

/**
 * 迷宫老鼠问题
 * 假设我们有一个大小为 N * N 的矩阵，矩阵的每个位置是一个方块。
 * 每个位置(或块)可以是空闲的(值为 1)或是被阻挡的(值为 0)
 * 矩阵就是迷宫，“老鼠”的目标是从位置 [0][0] 开始并移动到 [n-1][n-1]。老鼠可以在垂直或水平方向上任何未被阻拦的位置间移动
 * @param {Array} maze 迷宫矩阵
 */
const ratInAMaze = (maze) => {
  const solution = []
  // 创建一个包含解的矩阵
  // 将每个位置初始化为零
  for (let i = 0; i < maze.length; i++) {
    solution[i] = []
    for (let j = 0; j < maze[i].length; j++) {
      solution[i][j] = 0
    }
  }
  // 对于老鼠采取的每步行动，我们将路径标记为 1
  // 如果算法能够找到一个解，就返回解决矩阵，否则返回一条错误信息
  if (findPath(maze, 0, 0, solution) === true) {
    return solution
  }
  return 'NO PATH FOUND'
}

/**
 * 从位置 x y 开始在给定的 maze 矩阵中找到一个解
 * @param {Array} maze 迷宫矩阵
 * @param {Number} x x 坐标
 * @param {Number} y y 坐标
 * @param {Array} solution 包含解的矩阵
 */
const findPath = (maze, x, y, solution) => {
  const n = maze.length
  // 验证老鼠是否达到了终点
  if (x === n - 1 && y === n - 1) {
    // 将最后一个位置标记为路径的一部分并返回 true
    solution[x][y] = 1
    return true
  }
  // 如果不是最后一步，要验证老鼠能够安全移动至该位置
  if (isSafe(maze, x, y) === true) {
    // 如果是安全的，我们将这步加入路径
    solution[x][y] = 1
    // 试着在 maze 矩阵中水平移动
    if (findPath(maze, x + 1, y, solution)) {
      return true
    }
    // 试着向下移动
    if (findPath(maze, x, y + 1, solution)) {
      return true
    }
    // 如果水平垂直都不能移动，那么将这步从路径中移除并回溯，表示算法会尝试另一个可能的解
    solution[x][y] = 0
    return false
  }
  return false
}

const isSafe = (maze, x, y) => {
  const n = maze.length
  if (x >= 0 && y >= 0 && x < n && y < n && maze[x][y] !== 0) {
    return true
  }
  return false
}

const maze = [
  [1,0,0,0],
  [1,1,1,1],
  [0,0,1,0],
  [0,1,1,1]
]

console.log('ratInAMaze(maze): ', ratInAMaze(maze));

/**
 * 数独解题器
 * 数独解题器的回溯算法会尝试在每行每列中填入每个数字
 * @param {Array} matrix 初始矩阵
 */
const sudokuSolver = (matrix) => {
  if (solveSudoku(matrix)) {
    return matrix
  }
  return '问题无解！'
}

const UNASSIGNED = 0

const solveSudoku = (matrix) => {
  let row = 0
  let col = 0
  let checkBlankSpaces = false
  // 验证是否被解决
  for (row = 0; row < matrix.length; row++) {
    for (col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === UNASSIGNED) {
        // 如果有空白位置
        checkBlankSpaces = true
        break
      }
    }
    // 我们要从两个循环中跳出
    if (checkBlankSpaces) {
      break
    }
  }
  if (!checkBlankSpaces) {
    return true
  }
  // 试着用 1~9 填写这个位置，一次填一个
  for (let num = 1; num <= 9; num++) {
    // 会检查添加的数字是否符合规则
    if (isSafeSudo(matrix, row, col, num)) {
      // 如果符合，我们就将这个数字填入
      matrix[row][col] = num
      // 填写下一个位置
      if (solveSudoku(matrix)) {
        return true
      }
      // 如果一个数组填在了不正确的位置，我们就再将这个位置标记为空
      matrix[row][col] = UNASSIGNED
    }
  }
  return false
}

const isSafeSudo = (matrix, row, col, num) => {
  return (
    !usedInRow(matrix, row, num) &&
    !usedInCol(matrix, col, num) &&
    !usedInBox(matrix, row - (row % 3), col - (col % 3), num)
  )
}

const usedInRow = (matrix, row, num) => {
  for (let col = 0; col < matrix.length; col++) {
    if (matrix[row][col] === num) {
      return true
    }
  }
  return false
}

const usedInCol = (matrix, col, num) => {
  for (let row = 0; row < matrix.length; row++) {
    if (matrix[row][col] === num) {
      return true
    }
  }
  return false
}

const usedInBox = (matrix, boxStartRow, boxStartCol, num) => {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (matrix[row + boxStartRow][col + boxStartCol] === num) {
        return true
      }
    }
  }
  return false
}

const sudokuGrid = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]
]

console.log('sudokuSolver(sudokuGrid): ', sudokuSolver(sudokuGrid));

/**
 * 函数式编程简介
 * 在命令式编程中，我们按部就班的编写程序代码，详细描述要完成的事情以及完成的顺序
 * 函数式范式进行开发并不简单，关键在于习惯这种范式的机制，函数就是摇滚明星，我盟关注的重点是需要描述什么，而不是如何描述
 */

/**
 * 打印数组
 * 命令式编程
 */
const printArray = (array) => {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
}

console.log('printArray([1,2,3,4,5]): ', printArray([1,2,3,4,5]));

/**
 * 函数式编程
 * 首先要关注的是迭代数据，然后进行操作
 */
const forEach = (array, action) => {
  for (let i = 0; i < array.length; i++) {
    action(array[i])
  }
}

const logItem = function (item) {
  console.log(item);
}

forEach([1,2,3,4,5], logItem)

/**
 * 1. 函数式编程的主要目标是描述数据，以及要对数据应用的转换
 * 2. 在函数式编程中，程序执行顺序的重要性很低；而在命令式编程中，步骤和顺序是非常重要的
 * 3. 函数和数据集合是函数式编程的核心
 * 4. 在函数式编程中，我们可以使用和滥用函数和递归，而在命令式编程中，则使用循环、赋值、条件和函数
 * 5. 在函数式编程中，要避免副作用和可变数据，意味着我们不会修改传入函数的数据。如果需要基于输入返回一个解决方案，可以制作一个副本并返回数据修改后的版本
 */

// ES2015

/**
 * 找出数组最小的值
 * @param {Array} array 数组
 */
const min_ = (array) => Math.min(...array)

/**
 * 我们可以使用 map 函数，把一个数据集合转换或映射成另一个数据集合
 * 
 * 我么可以用 filter 函数过滤一个集合的值
 * 
 * 我们可以使用 reduce 函数，把一个集合归约成一个特定的值
 */