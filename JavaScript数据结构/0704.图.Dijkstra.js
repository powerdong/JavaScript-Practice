/*
 * @Author lihaodong
 * @Date 2020/05/03
 * @TODO TODO
 */
/**
 * Dijkstra 算法是从一种计算从单个源到所有其他源的最短路径的贪心算法
 * 这意味着我么可以用它来计算从图的一个顶点到其余各顶点的最短路径
 */

const graph = [
  [0,2,4,0,0,0],
  [0,0,1,4,2,0],
  [0,0,0,0,3,0],
  [0,0,0,0,0,2],
  [0,0,0,3,0,2],
  [0,0,0,0,0,0]
]

const INF = Number.MAX_SAFE_INTEGER;

const dijkstra = (graph, src) => {
  const dist = []
  const visited = []
  const { length } = graph
  // 首先，把所有的距离(dist)初始化为无限大，将 visited 初始化为 false
  for (let i = 0; i < length; i++) {
    dist[i] = INF;
    visited[i] = false
  }
  // 把源顶点到自己的距离设为 0
  dist[src] = 0
  // 找出其余顶点的最短路径
  for (let i = 0; i < length - 1; i++) {
    // 为此我们需要从尚未处理的顶点中选出距离最近的顶点
    const u = minDistance(dist, visited)
    // 把选出的顶点标为 visited 以免重复计算
    visited[u] = true
    for (let v = 0; v < length; v++) {
      // 如果找到更短的路径
      if (!visited[v] && graph[u][v] !== 0 && dist[u] !== INF && dist[u] + graph[u][v] < dist[v]) {
        // 则更新最短路径的值
        dist[v] = dist[u] + graph[u][v]
      }
    }
  }
  return dist
}

const minDistance = (dist, visited) => {
  let min = INF
  let minIndex = -1
  for (let v = 0; v < dist.length; v++) {
    if (visited[v] === false && dist[v] <= min) {
      min = dist[v]
      minIndex = v
    }
  }
  return minIndex
}

dijkstra(graph, 0)
console.log('dijkstra(graph, 0): ', dijkstra(graph, 0));