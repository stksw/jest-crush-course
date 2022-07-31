const isSour = beverage => beverage === "lemonade" ? true : false;

describe('#isSour', () => {
  test('lemonade is sour', () => {
    expect(isSour('lemonade')).toBe(true);
  })

  it('cola is not sour', () => {
    expect(isSour('cola')).toBe(false);
  })
});

const getBeverage = age => {
  const beverages = [
    { name: 'cola', alcohol: false },
    { name: 'lemonade', alcohol: false },
    { name: 'beer', alcohol: true }
  ];

  const filteredBeverages = age >= 20 ? beverages : beverages.filter(b => b.alcohol === false);

  // 乱数を取得
  const seed = Math.floor(Math.random() * Math.floor(filteredBeverages.length));
  return filteredBeverages[seed];
}

describe('#getBeverage', () => {
  const spy = jest.spyOn(Math, 'random')
    .mockImplementationOnce(() => 0.7)
    .mockImplementationOnce(() => 0);
  const adult = 20;

  afterAll(() => {
    spy.mockRestore(); // Math.random()をオリジナルの関数に戻す
  })

  test('return beer when age is 20 old', () => {
    expect(getBeverage(adult).name).toBe('beer');
  })

  it('return cola when age is 20 old', () => {
    expect(getBeverage(adult).name).toBe('cola');
  })
});
