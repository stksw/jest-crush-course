// setTimeoutの第3引数はcallbackの引数になる
const fetchDataWithCallback = (callback) => {
  setTimeout(callback, 3000, 'lemon');
};

// callbackを使ったテストではdone()を実行する必要がある
test('return lemon', (done) => {
  const callbackFn = (data) => {
    expect(data).toBe('lemon');
    done();
  };

  fetchDataWithCallback(callbackFn);
});

const fetchData = () => Promise.resolve('lemon');

test('resolves to lemon', () => {
  return expect(fetchData()).resolves.toBe('lemon');
});

test('resolves to lemon with async/await', async () => {
  await expect(fetchData()).resolves.toBe('lemon');
});

const fetchData2 = (category = 'fruit') =>
  category === 'fruit' ? Promise.resolve('lemon') : Promise.reject(new Error('not exist'));

test('rejects with fish', () => {
  return expect(fetchData2('fish')).rejects.toThrow('not exist');
});
