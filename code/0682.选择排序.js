const selectSort = (arr) => {
  for (let i = 0, len = arr.length, min; i < len; i++) {
    min = arr[i]
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < min) {
        [min, arr[j]] = [arr[j], min]
      }
    }
    arr[i] = min
  }
  return arr
}

export default selectSort
