import { sum } from '../02_sum';

// toBeはプリミティブな値(number, string, boolean)なら問題ないが、
// オブジェクトなら、インスタンスが等価かチェックするので注意
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
