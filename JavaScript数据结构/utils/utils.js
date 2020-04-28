/*
 * @Author: Lambda
 * @Begin: 2020-04-08 14:19:37
 * @Update: 2020-04-12 11:00:30
 * @Update log: 更新日志
 */
const defaultEquals = (a, b) => a === b

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
  Colors
}
