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

module.exports = {
  defaultEquals,
  defaultToString
}
