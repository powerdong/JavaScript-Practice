/*
 * @Author lihaodong
 * @Date 2020/05/04
 * @TODO TODO
 */
/**
 * Floyd-Warshall 算法是一种计算题图中所有最短路径的动态规划算法
 * 通过该算法，我们可以找到从所有源到所有顶点的最短路径
 */

let graph = [
  [0, 1, 5, 65535, 65535, 65535, 65535, 65535, 65535],
  [1, 0, 3, 7, 5, 65535, 65535, 65535, 65535],
  [5, 3, 0, 65535, 1, 7, 65535, 65535, 65535],
  [65535, 7, 65535, 0, 2, 65535, 3, 65535, 65535],
  [65535, 5, 1, 2, 0, 3, 6, 9, 65535],
  [65535, 65535, 7, 65535, 3, 0, 65535, 5, 65535],
  [65535, 65535, 65535, 3, 6, 65535, 0, 2, 7],
  [65535, 65535, 65535, 65535, 9, 5, 2, 0, 4],
  [65535, 65535, 65535, 65535, 65535, 65535, 7, 4, 0],
]


const floydWarshall = graph => {
  const dist = []
  const { length } = graph
  // 首先把 distance 数组初始化为每个顶点之间的权值
  for (let i = 0; i < length; i++) {
    dist[i] = []
    for (let j = 0; j < length; j++) {
      if (i === j) {
        // 顶点到自身的距离为 0
        dist[i][j] = 0
      } else if (!isFinite(graph[i][j])) {
        // 如果两个顶点之间没有边，就将其表示为 Infinity
        dist[i][j] = Infinity
      } else {
        // i 到 j 可能的最短距离就是这些
        dist[i][j] = graph[i][j]
      }
    }
  }
  // 将顶点 0 到 k 作为中间点，从 i 到 j 的最短路径经过 k
  for (let k = 0; k < length; k++) {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        // 计算它通过顶点 k 和 i 和 j 之间的最短路径
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          // 如果一个最短路径的新值被找到，我们要使用并存储它
          dist[i][j] = dist[i][k] + dist[k][j]
        }
      }
    }
  }
  return dist
}

floydWarshall(graph)
console.log('floydWarshall(graph): ', floydWarshall(graph));