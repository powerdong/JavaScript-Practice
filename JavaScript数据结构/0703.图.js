/*
 * @Author lihaodong
 * @Date 2020/05/02
 * @TODO TODO
 */
/**
 * 图是网络结构的抽象模型。
 * 图是一组由边连续的节点(或顶点)
 * 由一条边连接在一起的顶点称为相邻顶点
 * 一个顶点的度是其相邻顶点的数量
 * 路径是顶点v1,v2...vk 的一个连续序列，其中 vi 和 vi+1 是相邻的
 * 简单路径要求不包含重复的顶点，环也是一个简单路径
 * 如果图中不存在环，则称该图为无环图，如果图中每两个顶点间都存在路径，则该图是连通的。 
 */

/**
 * 图可以是无向的(边没有方向)或有向的(有向图)
 * 如果图中每两个顶点间在双向上都存在路径，则该图是强连通的
 * 图还可以是未加权的(目前为止我们看到的图都是未加权的)或是加权的。
 * 
 * 比如搜索图中的一个特定顶点或搜索一条特定边，寻找图中的一条路径(从一个顶点到另一个顶点)，寻找两个顶点之间的最短路径，以及环检测。
 */

/**
 * 邻接矩阵
 * 每个节点都和一个整数相关联，该整数将作为数组的索引。我们用一个二维数组来表示顶点之间的连接。
 * 
 * 不是强连通的图(稀疏图)如果用邻接矩阵来表示，则矩阵中将会有很多 0，这意味着我们浪费了计算机存储空间来表示根本不存在的边。
 * 邻接矩阵表示法不够好的另一个理由是，图中顶点的数量可能会改变，而二维数组不太灵活。
 */

/**
 * 邻接表
 * 使用一种叫做邻接表的动态数据结构来表示图。
 * 邻接表由图中每个顶点的相邻顶点列表所组成。
 * 
 * TODO: 尽管邻接表可能对大多数问题来说都是更好的选择，但以上两种表示法都很有用，且它们有着不同的性质
 */

/**
 * 关联矩阵
 * 在关联矩阵中，矩阵的行表示顶点，列表示边
 * 使用二维数组来表示两者之间的连通性，如果顶点v是边e的入射点，则 array[v][e] === 1; 否则 array[v][e] === 0
 * 关联矩阵通常用于边的数量比顶点多的情况，以节省空间和内存
 */

const {
  Dictionary
} = require('./0697.字典');

const {
  Queue
} = require('./0691.队列');

const {
  Stack
} = require('./0690.栈');

const {
  GraphColors,
  initializeColor
} = require('./utils/utils')

class Graph {
  constructor(isDirected = false) {
    // 接受一个参数来表示图是否有向，默认情况下图是无向的
    this.isDirected = isDirected;
    // 我们使用一个数组来存储图中所有顶点的名字，以及一个字典来存储邻接表
    this.vertices = [];
    // 字典将会使用顶点的名字作为键，邻接顶点列表作为值
    this.adjList = new Dictionary()
  }
  /**
   * 向图中添加一个新的顶点
   * @param {Number} v 新顶点
   */
  addVertex(v) {
    // 只有在这个顶点不存在于图中时
    if (!this.vertices.includes(v)) {
      // 我们将顶点添加到顶点列表中
      this.vertices.push(v)
      // 并且在邻接表中，设置顶点 v 作为键对应的字典值为一个空数组
      this.adjList.set(v, [])
    }
  }
  /**
   * 
   * @param {Number} v 顶点
   * @param {Number} w 顶点
   */
  addEdge(v, w) {
    // 在连接顶点之前，需要验证顶点是否存在于图中
    if (!this.adjList.get(v)) {
      // 如果顶点 v 不存在于图中，要将它们加入顶点列表
      this.addVertex(v)
    }
    if (!this.adjList.get(w)) {
      // 如果顶点 w 不存在于图中，要将它们加入顶点行
      this.addVertex(w)
    }
    // 然后通过将 w 加入到 v 的邻接表中，我们添加了一条自顶点 v 到顶点 w 的边
    this.adjList.get(v).push(w)
    // 如果是无向图
    if (!this.isDirected) {
      // 需要添加一条自 w 到 v 的边
      this.adjList.get(w).push(v)
    }
  }
  /**
   * 返回顶点列表
   */
  getVertices() {
    return this.vertices
  }
  /**
   * 返回邻接表
   */
  getAdjList() {
    return this.adjList
  }
  toString() {
    let s = ''
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `
      const neighbors = this.adjList.get(this.vertices[i])
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]} `
      }
      s += '\n';
    }
    return s
  }
}

let graph = new Graph()
let myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i])
}
graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

console.log(graph.toString());
/*
  A -> B C D 
  B -> A E F 
  C -> A D G 
  D -> A C G H 
  E -> B I 
  F -> B 
  G -> C D 
  H -> D 
  I -> E 
*/

/**
 * 图的遍历
 * 和树数据结构类似，我们可以访问图的所有节点。
 * 广度优先搜索和深度优先搜索
 * 图遍历可以用来寻找特定的顶点或寻找两个顶点之间的路径，检查图是否连通，检查图是否有环等。
 * 
 * 图遍历算法的思想是必须追踪每个第一次访问的节点，并且追踪有哪些节点还没有被完全探索
 * 完全探索一个顶点要求我们查看该顶点的每一条边。对于每一条边所连接的没有被访问过的顶点，将其标注为被发现的。并将其加进待访问顶点列表中
 * 
 * 为了保证算法的效率，务必访问每个顶点至多两次
 */

/**
 * 深度优先搜索： 栈   | 将顶点存入栈，顶点是沿着路径被探索的，存在新的相邻顶点就去访问
 * 广度优先搜索： 队列 | 将顶点存入队列，最先入队列的顶点先被探索
 */


/**
 * 广度优先搜索算法会从指定的第一个顶点开始遍历图，先访问其所有的邻点(相邻顶点)，就像一次访问图的一层，===> 先宽后深地访问顶点
 * 1. 创建一个队列 Q
 * 2. 标注 v 为被发现的(灰色)，并将 v 入队列 Q
 * 3. 如果 Q 非空，则运行以下步骤
 *    1. 将 u 从 Q 中出队列
 *    2. 标注 u 为被发现的(灰色)
 *    3. 将 u 所有未被访问过的邻点(白色)入队列
 *    4. 标注 u 为已被探索的(黑色)
 */

/**
 * 广度优先搜索
 * @param {Graph} graph 图
 * @param {Number} startVertex 顶点
 * @param {Function} callback 回调函苏
 */
const breadthFirstSearch = (graph, startVertex, callback) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  // 将 color 数组初始化为白色
  const color = initializeColor(vertices)
  // 声明一个 Queue 实例，将会存储待访问和待探索的顶点
  const queue = new Queue()
  // 起始顶点是必要的，我们将此顶点入队列
  queue.enqueue(startVertex)
  // 如果队列非空
  while (!queue.isEmpty()) {
    // 我们将通过出队列操作从队列中移除一个顶点
    const u = queue.dequeue()
    // 并取得一个包含其所有邻点的邻接表
    const neighbors = adjList.get(u)
    // 该顶点将标注为灰色，表示我们发现了它
    color[u] = GraphColors.GREY
    for (let i = 0; i < neighbors.length; i++) {
      // 取得其值
      const w = neighbors[i];
      // 如果他还未被访问过
      if (color[w] === GraphColors.WHITE) {
        // 则将其标注为我们已经发现了它(设置为灰色)
        color[w] = GraphColors.GREY
        // 并将这个顶点加入到队列，这样当其从队列中出列的时候，我们可以完成对其的探索
        queue.enqueue(w)
      }
    }
    // 当完成探索该顶点和其相邻顶点后，我们将该顶点标注为已探索过的(设置为黑色)
    color[u] = GraphColors.BLACK
    if (callback) {
      // 如果我们传递了回调，就会用到它
      callback(u)
    }
  }
}

const printVertex = value => console.log('Visited vertex: ', value);
breadthFirstSearch(graph, myVertices[0], printVertex)


/**
 * 使用 BFS 寻找最短路径
 * 给定一个图 G 和源顶点 v，找出每个顶点 u 和 v 之前最短路径的距离(以边的数量计)
 * 对于给定顶点 v，广度优先算法会访问所有与其距离为 1 的顶点，接着是距离为 2 顶点，以此类推，所以，可以用广度优先算法来解决这个问题
 * @param {Graph} graph 图
 * @param {Number} startVertex 顶点
 * @returns {Object} 从 v 到 u 的距离 distances[u] 和 前溯点 predecessors[u] 用来推导出从 v 到其他每个顶点 u 的最短路径
 */
const BFS = (graph, startVertex) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)
  const queue = new Queue()
  // 表示距离
  const distances = {}
  // 表示前溯点
  const predecessors = {}
  queue.enqueue(startVertex)
  // 对于图中的没一个顶点，用 0 来初始化数组 distances，用 null 来初始化 predecessors
  for (let i = 0; i < vertices.length; i++) {
    distances[vertices[i]] = 0
    predecessors[vertices[i]] = null
  }

  while (!queue.isEmpty()) {
    const u = queue.dequeue()
    const neighbors = adjList.get(u)
    color[u] = GraphColors.GREY

    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === GraphColors.WHITE) {
        color[w] = GraphColors.GREY
        distances[w] = distances[u] + 1
        // 当我们发现顶点 u 的邻点 w 时则设置 w 的前溯点值为 u
        predecessors[w] = u
        queue.enqueue(w)
      }
    }
    color[u] = GraphColors.BLACK
  }
  return {
    distances,
    predecessors
  }
}

const shortestPathA = BFS(graph, myVertices[0])
console.log('shortestPathA: ', shortestPathA);
const formVertex = myVertices[0]

const printBFSVertex = (formVertex, myVertices) => {
  for (let i = 1; i < myVertices.length; i++) {
    // 从 myVertices 数组中得到值
    const toVertex = myVertices[i];
    // 创建一个栈来存储路径值
    const path = new Stack()
    for (let v = toVertex; v !== formVertex; v = shortestPathA.predecessors[v]) {
      path.push(v)
    }
    path.push(formVertex)
    let s = path.pop()
    while (!path.isEmpty()) {
      s += ' - ' + path.pop()
    }
    console.log(s);
  }
}

printBFSVertex(formVertex, myVertices);


/**
 * 深度优先搜索
 * 深度优先搜索算法将会从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶点被访问了，接着原路回退并探索下一条路径
 * *: 它是先深度后广度地访问顶点
 * 深度优先搜索算法不需要一个源顶点
 * 1. 标注 v 为被发现的(灰色)
 * 2. 对于 v 的所有未访问(白色)的邻点 w，访问顶点 w
 * 3. 标注 v 为已被探索的(黑色)
 * 深度优先搜索的步骤是递归的，这意味着深度优先搜索算法使用栈来存储函数调用(用递归调用所创建的栈)
 */

const depthFirstSearchVisit = (u, color, adjList, callback) => {
  // 当访问顶点 u 时，我们标注其为被发现的(灰色)
  color[u] = GraphColors.GREY
  if (callback) {
    // 如果有 callback 的话，则执行该函数输出已访问过的顶点
    callback(u)
  }
  // 取得包含顶点 u 所有邻点的列表
  const neighbors = adjList.get(u)
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i]
    // 对于顶点 u 的每一个未被访问过(白色)的邻点 w
    if (color[w] === GraphColors.WHITE) {
      depthFirstSearchVisit(w, color, adjList, callback)
    }
  }
  // 最后，在该顶点和邻点按深度访问之后，我们回退，意思是该顶点已被完全探索，并将其标注为黑色
  color[u] = GraphColors.BLACK
}

/**
 * 深度优先搜索
 * @param {Graph} graph 图
 * @param {Function} callback 回调
 */
const depthFirstSearch = (graph, callback) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === GraphColors.WHITE) {
      // 对于实例中每一个未被访问过的顶点，调用私有递归函数
      depthFirstSearchVisit(vertices[i], color, adjList, callback)
    }
  }
}

depthFirstSearch(graph, printVertex)

/**
 * 对于给定图 G，我们希望深度优先搜索算法遍历图 G 的所有节点，构建 "森林"(有根树的一个集合)以及一组源顶点(根)，并输出两个数组：发现时间和完成探索时间
 */

/**
 * 深度优先算法
 * @param {Graph} graph 图
 * @returns {Object}
 * 顶点 u 的发现时间 d[u]； 当顶点 u 被标注为黑色时，u 的完成探索时间 f[u]；顶点 u 的前溯点 p[u]
 */
const DFS = graph => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)
  const d = {}
  const f = {}
  const p = {}
  // 追踪发现时间和完成探索时间
  const time = {
    count: 0
  }
  // 初始化这些数组
  for (let i = 0; i < vertices.length; i++) {
    f[vertices[i]] = 0
    d[vertices[i]] = 0
    p[vertices[i]] = null
  }
  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === GraphColors.WHITE) {
      DFSVisit(vertices[i], color, d, f, p, time, adjList)
    }
  }
  return {
    discovery: d,
    finished: f,
    predecessors: p
  }
}

const DFSVisit = (u, color, d, f, p, time, adjList) => {
  color[u] = GraphColors.GREY;
  // 当一个顶点第一次被发现时，我们追踪其发现时间
  d[u] = ++time.count
  const neighbors = adjList.get(u)
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (color[w] === GraphColors.WHITE) {
      // 当它是由引自顶点 u 的边而被发现，我们追踪它的追溯点
      p[w] = u
      DFSVisit(w, color, d, f, p, time, adjList)
    }
  }
  color[u] = GraphColors.BLACK
  // 最后，当这个顶点被完全探索后，我们追溯其完成时间
  f[u] = ++time.count
}

/**
 * 拓扑排序——使用深度优先搜索
 * 一个有向图，意味着任务的执行是有顺序的，有向无环图
 * 当我们需要编排一些任务或步骤的执行顺序时，这称为拓扑排序
 */

graph = new Graph(true) // 有向图

myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i])
}
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('B', 'D')
graph.addEdge('B', 'E')
graph.addEdge('C', 'F')
graph.addEdge('F', 'E')

const result = DFS(graph)
const fTimes = result.finished
s = ''
for (let count = 0; count < myVertices.length; count++) {
  let max = 0
  let maxName = null
  for (let i = 0; i < myVertices.length; i++) {
    if (fTimes[myVertices[i]] > max) {
      max = fTimes[myVertices[i]]
      maxName = myVertices[i]
    }
  }
  s += ' - ' + maxName
  delete fTimes[maxName]
}

console.log('s: ', s);
