/*
 * @Author lihaodong
 * @Date 2020/05/04
 * @TODO TODO
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

const kruskal = graph => {
  const { length } = graph
  const parent = []
  let ne = 0
  let a;
  let b;
  let u;
  let v;
  // 首先，把邻接矩阵的值复制到 cost 数组，以方便修改且可以保留原始值
  const cost = initializeCost(graph)
  // 当 MST 的边数小于顶点总数减 1 时
  while (ne < length - 1) {
    for (let i = 0, min = INF; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (cost[i][j] < min) {
          // 找出权值最小的边
          min = cost[i][j]
          a = u = i;
          b = v = j
        }
      }
    }
    // 检查 MST 中是否已存在这条边，以避免环路
    u = find(u, parent)
    v = find(v, parent)
    // 如果 u 和 v 是不同的边，则将其加入 MST
    if (union(u, v, parent)) {
      ne++
    }
    // 从列表中移除这些边，以免重复计算
    cost[a][b] = cost[b][a] = INF
  }
  return parent
}

/**
 * 防止 MST 出现环路
 * @param {Number} i 索引
 * @param {Array} parent MST
 */
const find = (i, parent) => {
  while (parent[i]) {
    i = parent[i]
  }
  return i
}

const union = (i, j, parent) => {
  if (i !== j) {
    parent[j] = i
    return true
  }
  return false
}

const initializeCost = vertices => {
  var temp_arr = [];
	for(let i=0; i<vertices.length; ++i) {
		if(Array.isArray(vertices[i])){
			temp_arr[i] = initializeCost(vertices[i]);
		}else {
			temp_arr[i] = vertices[i];
		}
	}
	return temp_arr;
}

kruskal(graph)
console.log('kruskal(graph): ', kruskal(graph));
