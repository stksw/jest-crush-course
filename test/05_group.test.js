import { getBeverage, isSour } from '../05_beverage';

describe('#isSour', () => {
  test('lemonade is sour', () => {
    expect(isSour('lemonade')).toBe(true);
  });

  it('cola is not sour', () => {
    expect(isSour('cola')).toBe(false);
  });
});

describe('#getBeverage', () => {
  // Math.random()をモック化して
  const spy = jest
    .spyOn(Math, 'random')
    .mockImplementationOnce(() => 0.7) // 1回目の呼び出しでは乱数は0.7
    .mockImplementationOnce(() => 0); // 2回目の呼び出しでは乱数は0
  const adult = 20;

  afterAll(() => {
    spy.mockRestore(); // Math.random()をオリジナルの関数に戻す
  });

  // 乱数を0.7にしているので、必ずbeerが返る
  test('return beer when age is 20 old', () => {
    expect(getBeverage(adult).name).toBe('beer');
  });

  // 乱数を0にしているので、必ずcolaが返る
  it('return cola when age is 20 old', () => {
    expect(getBeverage(adult).name).toBe('cola');
  });
});
