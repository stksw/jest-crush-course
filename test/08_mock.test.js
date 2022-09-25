import { greet } from '../08_mock_greeter';

describe('#jest.fn', () => {
  it('check jest.fn specification', () => {
    const mockFunction = jest.fn();

    // mockFunction関数の単純にjest.fn()でモック関数を作成した場合、undefinedが返り値として設定されます。
    expect(mockFunction()).toBe(undefined);

    // モック関数には mock というプロパティが存在します。
    expect(mockFunction).toHaveProperty('mock');

    // mockFunction関数は1度呼び出された
    expect(mockFunction.mock.calls.length).toBe(1);

    // mockFunction関数が1度呼び出された際に、引数は空だった
    expect(mockFunction.mock.calls[0]).toEqual([]);

    // mockFunction関数の結果は1つある
    expect(mockFunction.mock.results.length).toBe(1);

    // mockFunction関数が1度⽬に呼び出された結果は正常にリターンされている
    expect(mockFunction.mock.results[0].type).toBe('return');

    // mockFunction関数の1度⽬の結果は`undefined`である
    expect(mockFunction.mock.results[0].value).toBe(undefined);

    // mockFunction関数からnewを利⽤してインスタンスを作成していない
    expect(mockFunction.mock.instances[0]).toBe(undefined);
  });

  it('return Hello from mockFunction', () => {
    // mockImplementation関数の引数に独自の関数を与えることで、モック関数をカスタマイズできる
    // mockFunction関数の返り値にHelloを設定
    const mockFunction = jest.fn().mockImplementation(() => 'Hello');

    expect(mockFunction()).toBe('Hello');
  });

  it('return Hello once then it returns Goodbye', () => {
    const mockFunction = jest
      .fn()
      .mockImplementationOnce(() => 'Hello')
      .mockImplementationOnce(() => 'Goodbye');

    expect(mockFunction()).toBe('Hello');
    expect(mockFunction()).toBe('Goodbye');
    // デフォルト返り値のundefinedが返る
    expect(mockFunction()).toBe(undefined);
  });
});

describe('#spyOn', () => {
  // Math.randomはを1を返す、オリジナルの関数は0から1以下の数を返す
  const spy = jest.spyOn(Math, 'random').mockImplementation(() => 1);

  afterEach(() => {
    // モック関数をオリジナルの関数に戻す
    spy.mockRestore();
  });

  it('Math.random return 1', () => {
    expect(Math.random()).toEqual(1);
  });

  it('Math.random return under 1', () => {
    expect(Math.random()).toBeLessThan(1);
  });
});

describe('#greeter', () => {
  describe('#greet', () => {
    const noonTime = new Date('2020-10-10T12:00:00');
    const morningTime = new Date('2020-10-10T11:00:00');

    beforeEach(() => {
      Date = jest.fn(() => noonTime);
    });

    describe('mock date function', () => {
      it('Hello <name> when the time is 12:00 - 05:59', () => {
        expect(greet('taka')).toEqual('Hello Taka!');
      });
    });

    it('Good morning <name> when the time is 06:00-11:59', () => {
      Date = jest.fn(() => morningTime);
      expect(greet('daniel')).toEqual('Good morning Daniel!');
    });
  });
});
