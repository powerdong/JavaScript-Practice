/*
 * @Author: Lambda
 * @Begin: 2020-04-06 15:36:01
 * @Update: 2020-04-06 16:45:25
 * @Update log: 更新日志
 */

function TreeNode (value) {
  this.value = value
  this.left = null
  this.right = null
}

/**
 * 重建二叉树
 * 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树(假设输入的前序遍历和中序遍历结果中不含重复的数字)
 * 例如输入前序遍历序列 [1, 2, 4, 7, 3, 5, 6, 8]和中序遍历序列 [4, 7, 2, 1, 5, 3, 8, 6]
 * @param {Array} dlr 前序遍历
 * @param {Array} ldr 中序遍历
 */
function reConstructBinaryTree (dlr, ldr) {
  if (dlr.length !== ldr.length) {
    return false
  }
  if (dlr.length === 0) {
    return null
  }
  // 前序第一个是根节点，也是中序左右子树的分割点
  const index = ldr.indexOf(dlr[0])
  // 左边的区域
  const left = ldr.slice(0, index)
  // 右边的区域
  const right = ldr.slice(index + 1)
  const root = new TreeNode(dlr[0])
  root.left = reConstructBinaryTree(dlr.slice(1, index + 1), left)
  root.right = reConstructBinaryTree(dlr.slice(index + 1), right)

  return root
}

console.log('reConstructBinaryTree([1, 2, 4, 7, 3, 5, 6, 8], [4, 7, 2, 1, 5, 3, 8, 6]): ', reConstructBinaryTree([1, 2, 4, 7, 3, 5, 6, 8], [4, 7, 2, 1, 5, 3, 8, 6]))
