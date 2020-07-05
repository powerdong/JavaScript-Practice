import restoreIpAddresses from '../LeetCode-code/93.复原ip地址'

test('复原ip地址：', () => {
  expect(restoreIpAddresses('25525511135')).toEqual(['255.255.11.135', '255.255.111.35'])
})
