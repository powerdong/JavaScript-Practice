// 非顺序数据结构是散列表
// 非顺序数据结构——树，它对于存储需要快速查找的数据非常有用

/**
 * 树是一种分层数据的抽象模型。
 * 现实生活中最常见的树的例子是家谱，或是公司的组织架构图
 */

/**
 * 一个树结构包含一系列存在父子关系的节点。每个节点都有一个父节点(除了顶部的第一个节点)以及零个或多个子节点。
 * 
 * 位于树顶部的节点叫作根节点。他没有父节点。树中每个元素都叫作节点。节点分为内部节点和外部节点。至少有一个子节点的节点称为内部节点
 * 没有子元素的节点称为外部节点或叶节点。
 * 
 * 一个节点可以有祖先和后代。一个节点(除了根节点)的祖先包括父节点、祖父节点、曾祖父节点等。一个节点的后代包括子节点、孙子节点、曾孙节点等。
 * 
 * 有关树的另一个术语是子树。子树由节点和它的后代构成
 * 
 * 节点的一个属性是深度，节点的深度取决于它的祖先节点的数量
 * 
 * 树的高度取决于所有节点深度的最大值
 */

/**
 * *: 二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点
 * 
 * 二叉搜索树是二叉树的一种，但是只允许你在左侧节点存储(比父节点)小的值，在右侧节点存储(比父节点)大的值
 */

const {
  TreeNode
} = require('./models/linked-list-models')
const {
  Compare,
  defaultCompare
} = require('./utils/utils')

const Node = TreeNode
/**
 * 创建 BinarySearchTree 类
 * 对于树，使用同样的方式
 */
class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn // 用来比较节点值
    this.root = null // Node 类型的根节点
  }
  /**
   * 向树中插入一个新键
   * @param {String} key 键值
   */
  insert(key) {
    // 验证插入操作是否是特殊情况
    if (this.root == null) {
      // 如果我们尝试插入的树节点是否为第一个节点，如果是，我们创建一个 Node 类的实例并将它赋值给 root
      this.root = new Node(key)
    } else {
      // 将节点添加到根节点之外的其他位置
      this.insertNode(this.root, key)
    }
  }
  /**
   * 将节点添加到根节点以外的其他位置
   * 帮助我们找到新节点应该插入的正确的位置
   * @param {Node} node 树节点
   * @param {String} key 要插入的新值
   */
  insertNode(node, key) {
    // 如果树非空，需要找到插入新节点的位置
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 如果新节点的键小于当前节点的键，需要检查当前节点的左侧子节点
      if (node.left == null) {
        // 如果他没有左侧子节点，就在那里插入新的节点
        node.left = new Node(key)
      } else {
        // 如果有左侧子节点，组要通过递归调用 insertNode 方法继续找到树的下一层
        this.insertNode(node.left, key)
      }
    } else {
      // 如果节点的键比当前节点的键大，同时当前节点没有右侧子节点，就在那里插入新的节点
      if (node.right == null) {
        node.right = new Node(key)
      } else {
        // 如果有右侧子节点，同样需要递归调用 insertNode 方法，但是要用来新节点比较的节点将会是右侧子节点
        this.insertNode(node.right, key)
      }
    }
  }
  /**
   * 中序遍历是一种以上行顺序访问 BST 所有节点的遍历方式，也就是以最小到最大的顺序访问所有节点。
   * *: 中序遍历的一种应用就是对树进行排序操作
   * @param {Function} callback 回调函数用来定义我们对遍历到的每个节点进行的操作
   */
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback)
  }
  /**
   * 回调函数用来定义我们对遍历到的每个节点进行操作
   * @param {Node} node 二叉树
   * @param {Function} callback 回调函数
   */
  inOrderTraverseNode(node, callback) {
    // 首先要检查以参数形式传入的节点是否为 null，这是停止递归继续执行的判断条件，即递归算法的基线条件。
    if (node != null) {
      // 然后调用相同的函数来访问左侧子节点
      this.inOrderTraverseNode(node.left, callback)
      // 接着对根节点进行操作
      callback(node.key)
      // 然后再访问右侧子节点
      this.inOrderTraverseNode(node.right, callback)
    }
  }
  /**
   * 先序遍历是以优先于后代节点的顺序访问每个节点的
   * 应用：打印一个结构化文档
   * @param {Function} callback 回调函数
   */
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }
  /**
   * 先序遍历会先访问节点本身，然后再访问它的左侧子节点，最后是右侧子节点
   * @param {Node} node 二叉树
   * @param {Function} callback 回调函数
   */
  preOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node.key)
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }
  /**
   * 后序遍历则是先访问节点的后代节点，再访问节点本身。
   * 应用：计算一个目录及其子目录中所有文件所占空间的大小
   * @param {Function} callback 回调函数
   */
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(node, callback)
  }
  /**
   * 后序遍历会先访问左侧子节点，然后是右侧子节点，最后是父节点本身
   * @param {Node} node 二叉树
   * @param {Function} callback 回调函数
   */
  postOrderTraverseNode(node, callback) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, callback)
      this.postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }
  /**
   * 寻找树的最小键
   */
  searchMinNode() {
    return this.minNode(this.root)
  }
  /**
   * 允许我们从树中任意一个节点开始寻找最小键
   * 使用它来找到一棵树或子树中最小的键
   * @param {Node} node 二叉树
   */
  minNode(node) {
    let current = node
    while (current != null && current.left != null) {
      current = current.left
    }
    return current
  }
  /**
   * 寻找树的最大键
   */
  searchMaxNode() {
    return this.maxNode(this.root)
  }
  /**
   * 要寻找最大键，我们要沿着树的右边进行遍历，直到找到最右端的节点
   * @param {Node} node 二叉树
   */
  maxNode(node) {
    let current = node
    while (current != null && current.right != null) {
      current = current.right
    }
    return current
  }
  /**
   * 搜索一个特定的值
   * @param {String} key 键
   */
  searchOneOfNode(key) {
    return this.searchNode(this.root, key)
  }
  /**
   * 寻找一棵树或其任意子树中的一个特定的值
   * @param {Node} node 二叉树
   * @param {String} key 键
   */
  searchNode(node, key) {
    if (node == null) {
      // 验证传入的 node 是否合法
      return false
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 如果要找的键比当前的节点小，那么继续在左侧的子树上搜索
      return this.searchNode(node.left, key)
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      // 如果要找的键比当前的节点大，那么就从右侧子节点开始继续搜索
      return this.searchNode(node.right, key)
    } else {
      // 否则就说明要找的键和当前节点的键相等，返回 true 来表示找到了这个键
      return true
    }
  }
  /**
   * 移除一个节点
   * @param {String} key 键
   */
  removeOneOfNode(key) {
    this.root = this.removeONode(this.root, key)
  }
  /**
   * 移除一个节点，将新树返回
   * @param {Node} node 二叉树
   * @param {String} key 键
   */
  removeNode(node, key) {
    if (node == null) {
      // 如果正在检测的节点为 null，那么说明键不存在于树中，返回 null
      return null
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 如果要找的键比当前节点的值小，就沿着树的左边找到下一个节点
      node.left = this.removeNode(node.left, key)
      return node
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      // 如果要找的键比当前节点的值大，那么就沿着树的右边找到下一个节点，也就是我们要分析它的子树
      node.right = this.removeNode(node.right, key)
      return node
    } else {
      // 如果我们找到了要找的键 键等于 node.key
      // 第一种情况，移除一个叶节点
      if (node.left == null && node.right == null) {
        // 第一种情况是该节点是一个没有左侧或右侧子节点的叶节点，在这种情况下，我们要做的就是给这个节点赋予 null 值来移除它
        node = null
        return node
      }
      // 第二种情况，移除有一个左侧或右侧子节点的节点，这种情况需要跳过这个节点，直接将父节点指向它的指针指向子节点。
      if (node.left == null) {
        // 如果这个指针没有左侧子节点，也就是说他有一个右侧子节点，因此我们把对他的引用改为对他右侧子节点的引用
        node = node.right
        // 并返回更新后的节点
        return node
      } else if (node.right == null) {
        // 如果这个节点没有右侧子节点，也是一样，把他的引用改为对他左侧子节点的引用并返回更新后的值
        node = node.left
        return node
      }
      // 第三种情况，移除有两个子节点的节点
      // 当找到要移出的节点后，需要找到他右边子树中最小的节点
      const aux = this.minNode(node.right)
      // 然后用它右侧子树中最小节点的键去更新这个节点的值，通过这一步，我们改变了这个节点的键
      node.key = aux.key
      // 继续把右侧子树中的最小节点移除，毕竟他已经被移至要移除的节点的位置
      node.right = this.removeNode(node.right, aux.key)
      // 最后向它的父节点返回更新后节点的引用
      return node
    }
  }
}


const tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)

const printNode = value => console.log(value);
tree.inOrderTraverse(printNode) // 3  5  6  7  8  9  10  11  12  13  14  15  18  20  25

/* BST 存在一个问题，取决于你添加的节点数，树的一条边可能会非常深，也就是说，树的一条分支会有很多层，而其他的分支却只有几层 */
/* 有一种树叫做 AVL 树。AVL 树是一种自平衡二叉搜索树，意思是任何一个节点左右两侧子树的高度之差最多为 1 */
/* 添加或移除节点时，AVL 树会尽可能尝试转换为完全树 */