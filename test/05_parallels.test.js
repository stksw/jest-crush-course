// 1秒後に文字列lemonを返す
const fetchData = () =>
  new Promise((resolve) => setTimeout(resolve, 1000, 'lemon'));

// n回fetchDataを繰り返す
const runMultipleTests = (n) => {
  Array.from(new Array(n).keys()).map((i) => {
    it.concurrent(`test-${i}: return lemon`, async () => {
      await expect(fetchData()).resolves.toBe('lemon');
    });
  });
};

// npm run test -- --runInBand --maxConcurrency 10として実行すると
// 1つのworker内で、並列で10のテストを実行する
describe('parallel tests', () => {
  // runMultipleTests(100);
  runMultipleTests(1);
});
