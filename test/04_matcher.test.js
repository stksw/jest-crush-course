// 呼び出すと例外を投げる
const compileAndroidCode = () => {
  throw new Error('you are using the wrong JDK');
}

describe('learn matcher', () => {
  test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
  })

  test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
  })

  const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk',
  ];

  test('the shopping list has milk on it', () => {
    expect(shoppingList).toContain('milk');
    expect(new Set(shoppingList)).toContain('milk');
  });

  test('compiling android goes as expected', () => {
    expect(() => compileAndroidCode()).toThrow();
    expect(() => compileAndroidCode()).toThrow(Error);
    expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
    expect(() => compileAndroidCode()).toThrow(/JDK/);
  })

})

