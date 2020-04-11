// @ts-check

/**
 * 分治法有一个问题，就是容易计算已经计算过的值，使用动态规划，可以将每一次分治时算出的值记录下来，防止重复计算，从而提升效率
 */

/**
 * 青蛙跳台阶问题
 * @param {Number} total 台阶数
 */
function count1Fn (total) {
  if (total === 0) return 0
  if (total === 1) return 1
  if (total === 2) return 2
  return count1Fn(total - 1) + count1Fn(total - 2)
}
const count1 = count1Fn(5)
console.log('count1: ', count1)

/**
 * 使用动态规划优化效率
 * @param {Number} total 总共的台阶数
 */
function count2Fn (total) {
  // 缓存已经计算过的结果
  var cache = {}
  /**
   * @param {number} total
   */
  function _count (total) {
    if (cache[total] !== undefined) {
      // 直接使用缓存结果
      return cache[total]
    }
    let result
    if (total === 0) result = 0
    else if (total === 1) result = 1
    else if (total === 2) result = 2
    else result = _count(total - 1) + _count(total - 2)
    cache[total] = result
    return result
  }
  return _count(total)
}

const count2 = count2Fn(4)
console.log('count2: ', count2)

/**
 * 找到两个字符串的最长公共子序列
 * @param {String} str1 字符串1
 * @param {String} str2 字符串2
 */
function LCS (str1, str2) {
  let cache = []
  /**
   * 子函数
   * @param {String} str1 1
   * @param {String} str2 2
   */
  function _LCS (str1, str2) {
    if (str1 === '' || str2 === '') {
      return ''
    }
    // 查看缓存
    for (let i = 0; i < cache.length; i++) {
      if (cache[i].str1 === str1 && cache[i].str2 === str2) {
        // 缓存中有直接取
        return cache[i].result
      }
    }
    let result
    // 两个字符串都有值
    if (str1[0] === str2[0]) {
      result = str1[0] + _LCS(str1.substr(1), str2.substr(1))
    } else {
      // 去掉第一个字符串的首字母
      let lcs1 = _LCS(str1.substr(1), str2)
      // 去掉第二个字符串的首字母
      let lcs2 = _LCS(str1, str2.substr(1))
      if (lcs1.length > lcs2.length) {
        result = lcs1
      } else {
        result = lcs2
      }
    }
    cache.push({
      str1,
      str2,
      result
    })
    return result
  }
  return _LCS(str1, str2)
}

LCS('我是两个字符串中的一个', '我是第二个')
