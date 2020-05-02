/*
 * @Author lihaodong
 * @Date 2020/04/13
 * @TODO TODO
 */
/**
 * 比较两个元素是否相等
 * @param {any} a 元素
 * @param {any} b 元素
 */
const defaultEquals = (a, b) => a === b

/**
 * 交换数组中两个元素的位置
 * @param {Array} arr 数组
 * @param {Number} i1 索引
 * @param {Number} i2 索引
 */
const swap = (arr, i1, i2) => {
  [arr[i1], arr[i2]] = [arr[i2], arr[i1]]
}

const defaultToString = (item) => {
  if (item === null) {
    return 'NULL'
  } else if (item === undefined) {
    return 'UNDEFINED'
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`
  }
  return item.toString()
}


const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
}

const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5
}

const defaultCompare = (a, b) => {
  if (a === b) {
    // 如果元素有相同的引用
    return 0
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

const Colors = {
  RED: 'red',
  BLACK: 'black'
}


module.exports = {
  defaultEquals,
  defaultToString,
  defaultCompare,
  Compare,
  BalanceFactor,
  Colors,
  swap
}
