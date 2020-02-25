// 冒泡排序
// [1, 3, 4, 8, 2, 7, 2, 8, 3]
const sortArr = (arr) => {
  for (let i = arr.length - 1, tmp; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      tmp = arr[j]
      if (tmp > arr[j + 1]) {
        arr[j] = arr[j + 1]
        arr[j + 1] = tmp
      }
    }
  }
  console.log(arr)
  return arr
}
export default sortArr
