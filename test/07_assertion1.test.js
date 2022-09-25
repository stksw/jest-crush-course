const can1 = {
  flavor: 'grapeFruit',
  ounces: 12,
};

const can2 = {
  flavor: 'grapeFruit',
  ounces: 12,
};

const can3 = can2;

// 同じ値を持つオブジェクトなら等価となる
test('have all the same properties', () => {
  expect(can1).toEqual(can2);
});

// 同じ値を持つが、異なるインスタンスであるため
test('are not the expect same can', () => {
  expect(can1).not.toBe(can2);
});

// can3はcan2の参照を持っているため、同じインスタンスを参照している
test('are not same references', () => {
  expect(can2).toBe(can3);
});

// プリミティブな値なら異なるインスタンスでも等価となる
test('are the same value', () => {
  expect(can1.ounces).toBe(can2.ounces);
  expect(can1.ounces).toEqual(can2.ounces);
});

// const fetchData1 = () => Promise.resolve('lemon');

// test('resolves to lemon', () => {
//   return expect(fetchData1()).resolves.toBe('lemon');
// })
// // returnが必要
// test('resolves to lemon', () => {
//   return expect(fetchData1()).resolves.toBe('lemon');
// })

// // async/awaitを使う場合
// test('resolves to lemon with async/await', async () => {
//   await expect(fetchData1()).resolves.toBe('lemon');
// })

// const fetchData2 = (category = 'fruit') => category === 'fruit'
//   ? Promise.resolve('lemon')
//   : Promise.reject(new Error('not exist'));

// test('rejects with fish', () => {
//   return expect(fetchData2('fish')).rejects.toThrow('not exist');
// })
