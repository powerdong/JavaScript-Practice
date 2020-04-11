/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if(strs.length === 0) return ''
    let startStr = strs[0]
    for (let i = 1; i < strs.length; i++) {
      let j = 0
      for (; j < startStr.length; j++) {
          if(startStr[j] !== strs[i][j])
            break
        
      }
      startStr = startStr.substring(0, j)
      if(startStr === '')
        return startStr
    }
    return startStr
};
longestCommonPrefix(["flower","flow","flight"])
// @lc code=end

