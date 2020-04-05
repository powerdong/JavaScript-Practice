/**
 * 树：树是一个类似于链表的二维结构，每个节点可以指向 0 个或多个节点
 */

/**
 * 树具有以下特点：
 * 1. 单根：如果一个节点 A 指向另一个节点 B，仅能通过 A 直接找到 B 节点，不可能通过其他节点直接找到 B 节点
 * 2. 无环：节点的指向不能形成环
 */

/**
 * 树的术语
 * 1. 结点的度：某个节点的度 = 该节点子节点的数量
 * 2. 树的度：一棵树中，最大的节点的度为该树的度
 * 3. 结点的层：从根开始定义起，根为第 1 层。根的子节点为第 2 层，以此类推
 * 4. 树的高度或深度：树中结点的最大层次
 * 5. 叶子节点：度为 0 的节点称为叶节点
 * 6. 分支节点：非叶子节点
 * 7. 子节点、父节点：相对概念，如果 A 节点有一个子节点 B，则 A 是 B 的父节点，B 是 A 的子节点
 * 8. 兄弟节点：如果两个节点有同一个父节点，则他们互为兄弟节点
 * 9. 祖先节点：某个节点的祖先节点，是从树的根节点到该节点本身经过的所有节点
 * 10. 后代节点：如果 A 是 B 的祖先节点，B 则是 A 的后代节点
 */

/**
 * 树的代码表示
 * @param {*} value 值
 */
function Node (value) {
  this.value = value
  this.children = []
}

const node = new Node(1)
console.log('node: ', node)
/**
 * 二叉树
 *
 * 如果一棵树的度为 2，则该树是二叉树
 */

class TwoForkTree {
  constructor (value) {
    this.value = value
    this.left = null
    this.right = null
  }
  /**
   * 前序遍历
   * 输出自己->输出左边->输出右边
   */
  DLR (root) {
    if (!root) {
      return false
    }
    console.log(root.value)
    // 输出左边
    this.DLR(root.left)
    // 输出右边
    this.DLR(root.right)
  }
  /**
   * 中序遍历
   * 输出左边->输出自己->输出右边
   */
  LDR (root) {
    if (!root) {
      return false
    }
    // 输出左边
    this.LRD(root.left)
    // 输出自己
    console.log(root.value)
    // 输出右边
    this.LDR(root.right)
  }
  /**
   * 后续遍历
   * 输出左边->输出右边->输出自己
   */
  LRD (root) {
    if (!root) {
      return false
    }
    // 输出左边
    this.LRD(root.left)
    // 输出右边
    this.LRD(root.right)
    // 输出自己
    console.log(root.value)
  }
  /**
   * 根据前序遍历，中序遍历，得到一棵二叉树
   * @param {Array} dlr 前序遍历
   * @param {Array} ldr 中序遍历
   */
  getTree (dlr, ldr) {
    if (dlr.length !== ldr.length) {
      throw new Error('无解')
    }
    if (dlr.length === 0) {
      return null
    }
    // 前序遍历的第一个就是根
    const rootValue = dlr[0]
    // 创建根节点
    const root = new TwoForkTree(rootValue)

    // 加左节点
    // 根节点在中序遍历中的索引
    const index = ldr.indexOf(rootValue)
    // 左边的中序遍历结果
    const leftLDR = ldr.slice(0, index)
    // 左边的前序遍历结果
    const leftDLR = dlr.slice(1, 1 + leftLDR.length)
    root.left = this.getTree(leftDLR, leftLDR)

    // 加右节点
    // 右边的中序遍历结果
    const rightLDR = ldr.slice(index + 1)
    // 右边的前序遍历结果
    const rightDLR = dlr.slice(1 + rightLDR)
    root.right = this.getTree(rightDLR, rightLDR)
  }
  getDepth (root) {
    if (!root) {
      return 0
    }
    return 1 + Math.max(this.getDepth(root.left), this.getDepth(root.right))
  }
  /**
   * 深度搜索
   * @param {*} root 根节点
   * @param {*} target 目标值
   */
  searchDeep (root, target) {
    if (!root) {
      return false
    }
    // 先看自己
    if (root.value === target) {
      return true
    }
    // 左边或后边任何一个找到
    return this.searchDeep(root.left, target) || this.searchDeep(root.right, target)
  }
  /**
   * 广度搜索
   * @param {*} root 根节点
   * @param {*} target 目标值
   */
  searchWide (root, target) {
    if (!root) {
      return false
    }
    /**
     * 辅助函数
     * @param {*} layer 要搜索的节点数组
     */
    function _searchWide (layer) {
      if (layer.length === 0) {
        // 这一层没东西
        return false
      }
      // 下一层的数组
      var nextLayer = []
      for (let i = 0; i < layer.length; i++) {
        if (layer[i].value === target) {
          return true
        }
        if (layer[i].left) {
          nextLayer.push(layer[i].left)
        }
        if (layer[i].right) {
          nextLayer.push(layer[i].right)
        }
      }
      return _searchWide(nextLayer)
    }
    return _searchWide([root])
  }
  /**
   * 得到两个树的差异
   * @param {*} root1 第一棵树
   * @param {*} root2 第二棵树
   */
  diff (root1, root2) {
    // 保存差异的数组
    var result = []
    if (!root1 && !root2) {
      // 两个树都没有节点
      return result
    }
    if (!root1 && root2) {
      // 左边没有，右边有
      result.push({
        type: '新增',
        from: root1,
        to: root2
      })
    } else if (root1 && !root2) {
      result.push({
        type: '删除',
        from: root1,
        to: root2
      })
    } else if (root1.value !== root2.value) {
      result.push({
        type: '修改',
        from: root1,
        to: root2
      })

      // 比较后续
      const resultLeft = this.diff(root1.left, root2.left) // 左边的差异
      const resultRight = this.diff(root1.right, root2.right) // 右边的差异
      result = result.concat(resultLeft)
      result = result.concat(resultRight)
    } else {
      // 两边一样，比较后续
      const resultLeft = this.diff(root1.left, root2.left) // 左边的差异
      const resultRight = this.diff(root1.right, root2.right) // 右边的差异
      result = result.concat(resultLeft)
      result = result.concat(resultRight)
    }
    return result
  }
}

const root = new TwoForkTree('A')
const leftSon = new TwoForkTree('B')
const rightSon = new TwoForkTree('C')
const leftGrandSonLeft = new TwoForkTree('D')
const leftGrandSonRight = new TwoForkTree('E')
const rightGrandSonLeft = new TwoForkTree('F')
const rightGrandSonRight = new TwoForkTree('G')

const root1 = new TwoForkTree('C')
const leftSon1 = new TwoForkTree('B')
const rightSon1 = new TwoForkTree('A')
const leftGrandSonLeft1 = new TwoForkTree('D')
const leftGrandSonRight1 = new TwoForkTree('G')
const rightGrandSonLeft1 = new TwoForkTree('E')

root.left = leftSon
root.right = rightSon
leftSon.left = leftGrandSonLeft
leftSon.right = leftGrandSonRight
rightSon.left = rightGrandSonLeft
rightSon.right = rightGrandSonRight

root1.left = leftSon1
root1.right = rightSon1
leftSon1.left = leftGrandSonLeft1
leftSon1.right = leftGrandSonRight1
rightSon1.left = rightGrandSonLeft1

console.log('root.DLR(root): ', root.DLR(root))
console.log('root.LDR(root): ', root.LDR(root))
console.log('root.LRD(root): ', root.LRD(root))
console.log('root.getTree(root): ', root.getTree(root.DLR(root), root.LDR(root)))
console.log('root.getDepth(root): ', root.getDepth(root))
console.log('root.searchDeep(root): ', root.searchDeep(root, 'B'))
console.log('root.searchWide(root): ', root.searchWide(root, 'F'))
console.log('root.diff(root): ', root.diff(root, root1))
