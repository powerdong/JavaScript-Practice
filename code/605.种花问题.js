/*
 * @lc app=leetcode.cn id=605 lang=javascript
 *
 * [605] 种花问题
 */

// @lc code=start
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  if (flowerbed.length === 1 && flowerbed[0] === 0) {
    return true
  }
  let max = 0
  for (let i = 0, len = flowerbed.length; i < len; i++) {
    if (flowerbed[i] === 0) {
      if (i === 0 && flowerbed[1] === 0) {
        max++
        i++
      } else if (flowerbed[i - 1] === 0 && flowerbed[i + 1] === 0) {
        max++
        i++
      } else if (i === len - 1 && flowerbed[len - 2] === 0) {
        max++
        i++
      }
    }
  }
  return max >= n
}
export default canPlaceFlowers
// @lc code=end
