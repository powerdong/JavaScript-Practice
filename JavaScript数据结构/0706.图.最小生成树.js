/*
 * @Author lihaodong
 * @Date 2020/05/04
 * @TODO TODO
 */
/**
 * 要以最低成本实现办公室电话线路相互连通，以节省资金
 * 岛桥问题：设想在 n 个岛屿之间建造桥梁，想用最低成本实现所有岛屿相互连通
 */

/**
 * Prim 算法是一种求解加权无向连通图的 MST 问题的贪心算法。
 * 他能找出一个边的子集，使得其构成的树包含图中所有顶点，且边的权值之和最小
 */

const graph = [
  [0,2,4,0,0,0],
  [2,0,2,4,2,0],
  [4,2,0,0,3,0],
  [0,4,0,0,3,2],
  [0,2,3,3,0,2],
  [0,0,0,2,2,0]
]

const INF = Number.MAX_SAFE_INTEGER

const prim = graph => {
  const parent = []
  const key = []
  const visited = []
  const { length } = graph
  // 首先把所有顶点(key)初始化为无限大，visited 初始化为 false
  for (let i = 0; i < length; i++) {
    key[i] = INF
    visited[i] = false
  }
  // 选择第一个 key 作为第一个顶点
  key[0] = 0
  // 因为第一个顶点总是 MST 的根节点
  parent[0] = -1
  // 对所有顶点求 MST
  for (let i = 0; i < length - 1; i++) {
    // 从未处理的顶点集合选出 key 值最小的顶点
    const u = minKey(graph, key, visited)
    // 把选出的顶点标为 visited，以免重复计算
    visited[u] = true
    for (let v = 0; v < length; v++) {
      // 如果得到更小的权值，则保存 MST 路径并更新其权值
      if (graph[u][v] && !visited[v] && graph[u][v] < key[v]) {
        parent[v] = u
        key[v] = graph[u][v]
      }
    }
  }
  // 处理完所有顶点后，返回包含 MST 的结果
  return parent
}

prim(graph)
console.log('prim(graph): ', prim(graph));