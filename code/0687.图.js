/**
 * 图结构中，一个结点可以链接到任意节点，所有结点链接而成的结构，即为图结构
 * 图结构中的链接可以是有向的，也可以是无向的(双向连接)
 *
 * 图结构没有根，可以有环，但是在一个图结构中，不能存在两个或以上孤立结点
 * 可以使用图中任意一个结点表示整个图结构
 * 图结构是一种常见的数据结构，例如网络爬虫抓取的网页就是一种典型的图结构
 */

class Graph {
  constructor (value) {
    this.value = value
    this.neighbors = []
  }
  /**
   * 查询某个值在图中是否存在
   * @param {*} node 图中某个节点
   * @param {*} targetValue 目标值
   */
  searchDeep (node, targetValue) {
    if (!node) {
      return false
    }
    let finded = [] // 保存已经找过的节点
    // 检查当前节点，以及节点的邻居是否满足要求
    // 表示：自己和邻居有没有
    function _search (node) {
      if (finded.includes(node)) {
        return false // 没有找到
      }
      if (node.value === targetValue) {
        return true
      }
      finded.push(node) // 加入到已查找的节点
      for (let i = 0; i < node.neighbors.length; i++) {
        const nodeNeighbor = node.neighbors[i] // 拿到邻居节点
        if (_search(nodeNeighbor)) {
          return true
        }
      }
      return false
    }
    return _search(node)
  }
  /**
   * 连接nodes数组中所有的点，得到一个最小生成树
   * @param {Array} nodes 点的集合
   * @param {Array} sides 边的集合  二维数组
   */
  prim (nodes, sides) {
    if (nodes.length <= 1 || nodes.length !== sides.length) {
      return false
    }
    const tribes = [nodes[0]] // 把第一个点组成一个部落
    while (tribes.length < nodes.length) {
      // 向部落中增加一个点
      _addNodeToTribes()
    }
    /**
     * 添加一个点到部落
     */
    function _addNodeToTribes () {
      // 1. 从nodes中选出一个到部落最近的点
      const result = _chooseNearNodeToTribe()
      // 2. 将该点和部落中的某个点连接起来
      result.node.neighbors.push(result.target)
      result.target.neighbors.push(result.node)
      // 3. 加入到部落中
      tribes.push(result.node)
    }
    /**
     * 选一个距离当前部落最近的点
     * return
     * {
     *  node: 到部落最近的点,
     *  target: 连接到部落的哪个点
     * }
     */
    function _chooseNearNodeToTribe () {
      let result = {
        node: null,
        target: null,
        dis: Infinity
      }
      for (let i = 0; i < nodes.length; i++) {
        // 一个点一个点拿出来，看哪个点离部落最近
        const node = nodes[i]
        if (tribes.includes(node)) {
          // 部落里面已经有这个点了
          continue
        }
        // 得到 node 到部落最近的那个点的距离
        // {dis: 到部落的最短距离，target: 到部落的点}
        const temp = _getMinDisToTribe(node)
        if (temp.dis < result.dis) {
          result.node = node
          result.target = temp.target
          result.dis = temp.dis
        }
      }
      return result
    }
    /**
     * 得到指定的点到部落的最短距离，以及目标点
     * {
     *  dis: 到部落的最短距离,
     *  target: 到部落的点
     * }
     * @param {*} node
     */
    function _getMinDisToTribe (node) {
      let result = {
        target: tribes[0],
        dis: Infinity
      }
      // 循环部落
      for (let i = 0; i < tribes.length; i++) {
        // 拿到部落的当前点
        const target = tribes[i]
        // 计算 node 到 target 的距离
        const row = tribes.indexOf(node)
        const col = tribes.indexOf(target)
        const dis = sides[row][col]
        if (dis < result.dis) {
          result.target = target
          result.dis = dis
        }
      }
      return result
    }
  }
}

const a = new Graph('a')
const b = new Graph('b')
const c = new Graph('c')
const d = new Graph('d')
const e = new Graph('e')
a.neighbors = [a, d, e]
b.neighbors = [c, a, e]
c.neighbors = [a, e]
d.neighbors = [a]
e.neighbors = [b, d, c]

const nodes = [a, b, c, d, e]
const sides = [
  [0, 7, 9, 6, Infinity], // a到其他点的距离
  [7, 0, Infinity, 8, 4], // b到其他点的距离
  [9, Infinity, 0, Infinity, Infinity], // c到其他点的距离
  [6, 8, Infinity, 0, Infinity], // d到其他点的距离
  [Infinity, 4, 5, Infinity, 0] // e到其他点的距离
]

Graph.prim(nodes, sides)
