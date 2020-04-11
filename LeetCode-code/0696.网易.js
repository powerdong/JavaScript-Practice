// console.log(111)

// while (line = readline()) {
//   var lines = line.split(' ')
//   var a = parseInt(lines[0])
//   var b = parseInt(lines[1])
//   print(a + b)
// }

// var n = parseInt(readline())
// var arr = readline().split(' ')

function maxSonList (str) {
  const arr = str.split('')
  if (arr.length < 5) {
    return -1
  }
  let result = []
  let resultNum = 0
  for (let i = 0; i < arr.length; i++) {
    result = [arr[i]]
    for (let j = i; j < arr.length; j++) {
      if (result[result.length - 1] === '2' && arr[j] === '5') {
        result.push(arr[j])
      } else if (result[result.length - 1] === '5' && arr[j] === '2') {
        result.push(arr[j])
      }
      if (result.length % 5 === 0) {
        resultNum++
        result = [arr[i]]
      }
    }
  }
  console.log(resultNum)
  return result
}

maxSonList('123')
console.log('maxSonList("123"): ', maxSonList('2255225522'))
