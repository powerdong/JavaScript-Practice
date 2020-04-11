/*
 * @lc app=leetcode.cn id=914 lang=javascript
 *
 * [914] 卡牌分组
 */

// @lc code=start
/**
 * @param {number[]} deck
 * @return {boolean}
 */
var hasGroupsSizeX = function (deck) {
  function gcd (x, y) {
    return x === 0 ? y : gcd(y % x, x)
  }

  let obj = {}
  for (let i of deck) {
    obj[i] = !obj[i] ? 1 : ++obj[i]
  }

  let arr = Object.values(obj)
  let res = arr[0]
  return arr.every(i => (res = gcd(res, i)) > 1)
}
// hasGroupsSizeX([0, 0, 0, 1, 1, 1, 2, 2, 2])
export default hasGroupsSizeX
// @lc code=end
